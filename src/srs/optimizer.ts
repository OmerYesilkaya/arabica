import type { ReviewLogRow } from '../db/db'
import type { Metrics } from './optimizeData'
import type { OptimizeRequest, OptimizeResponse } from './optimizeWorker'

export interface OptimizeResult {
  proposed: number[]
  current: Metrics
  proposedMetrics: Metrics
  itemCount: number
  reviewCount: number
}

export interface OptimizeProgress {
  processed: number
  total: number
}

/**
 * True when this context can run the optimizer. Training needs SharedArrayBuffer,
 * which requires cross-origin isolation (the service worker supplies the
 * COOP/COEP headers that turn it on).
 */
export function canOptimize(): boolean {
  return typeof Worker !== 'undefined' && self.crossOriginIsolated === true
}

/**
 * Run FSRS optimization in a web worker so the UI stays responsive. Resolves
 * with the proposed weights and the current-vs-proposed evaluation metrics.
 */
export function optimizeParameters(
  rows: ReviewLogRow[],
  currentWeights: number[],
  onProgress?: (p: OptimizeProgress) => void,
): Promise<OptimizeResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./optimizeWorker.ts', import.meta.url), {
      type: 'module',
    })
    let poll: ReturnType<typeof setInterval> | undefined
    const cleanup = () => {
      if (poll !== undefined) clearInterval(poll)
      worker.terminate()
    }

    worker.onerror = (e) => {
      cleanup()
      reject(new Error(e.message || 'optimizer worker failed to start'))
    }

    worker.onmessage = (event: MessageEvent<OptimizeResponse>) => {
      const msg = event.data
      if (msg.tag === 'progress-init') {
        if (onProgress) {
          const view = new Uint32Array(msg.buffer as ArrayBuffer, msg.pointer, 2)
          poll = setInterval(() => onProgress({ processed: view[0], total: view[1] }), 150)
        }
      } else if (msg.tag === 'done') {
        cleanup()
        resolve({
          proposed: msg.proposed,
          current: msg.current,
          proposedMetrics: msg.proposedMetrics,
          itemCount: msg.itemCount,
          reviewCount: msg.reviewCount,
        })
      } else {
        cleanup()
        reject(new Error(msg.message))
      }
    }

    worker.postMessage({ rows, currentWeights } satisfies OptimizeRequest)
  })
}
