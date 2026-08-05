// Character-level diff, used to show a learner where a typed answer differs
// from the correct one. Pure, no dependencies.

export type DiffOp = 'equal' | 'insert' | 'delete'

export interface DiffPart {
  op: DiffOp
  value: string
}

/**
 * Diff two strings by character via a longest-common-subsequence table.
 *
 * `expected` is the correct answer, `typed` is what the learner wrote. Parts
 * are returned left to right and merged by run:
 *  - 'equal'  characters present in both,
 *  - 'delete' characters in `expected` that are missing from `typed`,
 *  - 'insert' characters in `typed` that are not in `expected`.
 *
 * Characters are compared as Unicode code points, so surrogate pairs stay
 * whole. Arabic letters are in the BMP, but this keeps the helper general.
 */
export function diffChars(expected: string, typed: string): DiffPart[] {
  const a = [...expected]
  const b = [...typed]
  const n = a.length
  const m = b.length

  // lcs[i][j] = length of the LCS of a[i..] and b[j..].
  const lcs: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  )
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] =
        a[i] === b[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }

  const parts: DiffPart[] = []
  const push = (op: DiffOp, ch: string) => {
    const last = parts[parts.length - 1]
    if (last && last.op === op) last.value += ch
    else parts.push({ op, value: ch })
  }

  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      push('equal', a[i])
      i++
      j++
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      push('delete', a[i])
      i++
    } else {
      push('insert', b[j])
      j++
    }
  }
  while (i < n) push('delete', a[i++])
  while (j < m) push('insert', b[j++])

  return parts
}
