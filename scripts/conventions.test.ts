import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Enforces the rule in CLAUDE.md: Arabic script belongs in content data and in
 * the UI, never in prose about the code.
 *
 * The check is on comments only, which is what makes it exact. Content data,
 * the vendored corpus, string literals a test asserts on and the character maps
 * that transliterate are all code, not comments, so they need no exception -
 * and a rule with no exceptions cannot be argued with in review.
 *
 * Why the rule exists: comments are read in diffs, terminals and commit logs,
 * where bidirectional text reorders the line around it and mixed-direction
 * punctuation lands in the wrong place.
 */

const ROOTS = ['src', 'scripts']
const SOURCE = /\.(ts|tsx)$/
const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) sourceFiles(path, out)
    else if (SOURCE.test(path)) out.push(path)
  }
  return out
}

interface Comment {
  line: number
  text: string
}

/**
 * Comments in a TypeScript source, with string and template literals skipped
 * first so that a `//` inside a string is not mistaken for one.
 *
 * Deliberately a scanner rather than a parser: it only has to decide where
 * comments are, and pulling in a parser to police a comment rule would cost
 * more than the rule is worth.
 */
export function commentsOf(source: string): Comment[] {
  const comments: Comment[] = []
  let i = 0
  let line = 1

  while (i < source.length) {
    const c = source[i]

    if (c === '\n') {
      line++
      i++
      continue
    }

    if (c === '"' || c === "'" || c === '`') {
      const quote = c
      i++
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') i++
        else if (source[i] === '\n') line++
        i++
      }
      i++
      continue
    }

    if (c === '/' && source[i + 1] === '/') {
      let text = ''
      i += 2
      while (i < source.length && source[i] !== '\n') text += source[i++]
      comments.push({ line, text })
      continue
    }

    if (c === '/' && source[i + 1] === '*') {
      i += 2
      let text = ''
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) {
        if (source[i] === '\n') {
          comments.push({ line, text })
          text = ''
          line++
        } else {
          text += source[i]
        }
        i++
      }
      comments.push({ line, text })
      i += 2
      continue
    }

    i++
  }

  return comments
}

describe('comments carry no Arabic script', () => {
  it('finds the source files to check', () => {
    expect(ROOTS.flatMap((root) => sourceFiles(root)).length).toBeGreaterThan(30)
  })

  it('has none in src or scripts', () => {
    const offences: string[] = []
    for (const root of ROOTS) {
      for (const file of sourceFiles(root)) {
        for (const comment of commentsOf(readFileSync(file, 'utf8'))) {
          if (ARABIC.test(comment.text)) {
            offences.push(`${file}:${comment.line}: ${comment.text.trim()}`)
          }
        }
      }
    }
    expect(offences).toEqual([])
  })
})

describe('commentsOf', () => {
  it('reads both comment kinds', () => {
    const found = commentsOf('const a = 1 // one\n/* two\n   three */\n')
    expect(found.map((c) => c.text.trim())).toEqual(['one', 'two', 'three'])
  })

  it('ignores a comment marker inside a string', () => {
    expect(commentsOf(`const url = 'https://example.com/x'`)).toEqual([])
    expect(commentsOf('const s = "/* not a comment */"')).toEqual([])
  })

  it('ignores a quote inside a comment', () => {
    const found = commentsOf(`// it's fine\nconst a = 1\n`)
    expect(found.map((c) => c.text.trim())).toEqual(["it's fine"])
  })

  it('keeps line numbers across multi-line comments and strings', () => {
    const found = commentsOf('const a = `x\ny`\n// here\n')
    expect(found).toEqual([{ line: 3, text: ' here' }])
  })

  it('would catch Arabic in a comment', () => {
    const found = commentsOf('// the harf مِنْ\n')
    expect(ARABIC.test(found[0].text)).toBe(true)
  })

  it('does not flag Arabic in a string literal', () => {
    expect(commentsOf(`const min = 'مِنْ'`)).toEqual([])
  })
})
