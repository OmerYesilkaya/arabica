/// <reference lib="webworker" />
import init, {
  initThreadPool,
  Fsrs,
  Progress,
  TrainingConfig,
  type InitOutput,
} from 'fsrs-browser/fsrs_browser'
import { forgetting_curve } from 'ts-fsrs'
import type { ReviewLogRow } from '../db/db'
import { FSRS_WEIGHT_COUNT } from './fsrsParams'
import {
  aggregateMetrics,
  buildEvalArrays,
  buildTrainingArrays,
  groupSequences,
  type EvalArrays,
  type Metrics,
} from './optimizeData'

/** Message the worker receives to start an optimization run. */
export interface OptimizeRequest {
  rows: ReviewLogRow[]
  currentWeights: number[]
}

/** Messages the worker posts back. */
export type OptimizeResponse =
  | { tag: 'progress-init'; buffer: ArrayBufferLike; pointer: number }
  | {
      tag: 'done'
      proposed: number[]
      current: Metrics
      proposedMetrics: Metrics
      itemCount: number
      reviewCount: number
    }
  | { tag: 'error'; message: string }

const ctx = self as unknown as DedicatedWorkerGlobalScope

let output: InitOutput | null = null

// The FSRS optimizer trains on multiple threads (rayon). This needs a
// cross-origin-isolated context (SharedArrayBuffer); the service worker
// supplies the COOP/COEP headers that make that true.
async function ensureReady(): Promise<InitOutput> {
  if (output) return output
  output = await init()
  await initThreadPool(navigator.hardwareConcurrency || 4)
  return output
}

/** Score a weight vector against the observed reviews via log-loss and RMSE. */
function evaluate(weights: number[], data: EvalArrays): Metrics {
  const fsrs = new Fsrs(Float32Array.from(weights))
  const states = fsrs.memoryStateBatch(
    data.histRatings,
    data.histDeltaTs,
    data.histLengths,
  ) as Array<{ stability: number; difficulty: number }>
  const predicted = new Float64Array(states.length)
  for (let i = 0; i < states.length; i++) {
    predicted[i] = forgetting_curve(weights, data.predDeltaTs[i], states[i].stability)
  }
  fsrs.free()
  return aggregateMetrics(predicted, data.predLabels)
}

ctx.onmessage = async (event: MessageEvent<OptimizeRequest>) => {
  try {
    const out = await ensureReady()
    const { rows, currentWeights } = event.data

    const sequences = groupSequences(rows)
    const train = buildTrainingArrays(sequences)
    const evalData = buildEvalArrays(sequences)

    const fsrs = new Fsrs()
    const progress = Progress.new()
    // Share the wasm memory so the page can poll training progress; the sync
    // computeParameters call blocks this worker thread until it finishes.
    ctx.postMessage({
      tag: 'progress-init',
      buffer: out.memory.buffer,
      pointer: progress.pointer(),
    } satisfies OptimizeResponse)

    const proposedRaw = fsrs.computeParameters(
      train.ratings,
      train.deltaTs,
      train.lengths,
      progress,
      true,
      null,
      null,
      new TrainingConfig(),
    )
    fsrs.free()

    const proposed = Array.from(proposedRaw)
    if (proposed.length !== FSRS_WEIGHT_COUNT) {
      throw new Error(
        `optimizer returned ${proposed.length} weights, expected ${FSRS_WEIGHT_COUNT}`,
      )
    }

    const current = evaluate(currentWeights, evalData)
    const proposedMetrics = evaluate(proposed, evalData)

    ctx.postMessage({
      tag: 'done',
      proposed,
      current,
      proposedMetrics,
      itemCount: train.lengths.length,
      reviewCount: rows.length,
    } satisfies OptimizeResponse)
  } catch (err) {
    ctx.postMessage({
      tag: 'error',
      message: err instanceof Error ? err.message : String(err),
    } satisfies OptimizeResponse)
  }
}
