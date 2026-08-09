import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['fake-indexeddb/auto'],
    // Agent worktrees live under .claude/worktrees; never sweep them.
    //
    // The manual curation tools under scripts/ are named individually rather
    // than excluding scripts/ wholesale: they reach the network or write
    // content files, but the convention check beside them is pure and belongs
    // in every run. A new tool that does either has to be added here.
    exclude: [
      ...configDefaults.exclude,
      '.claude/**',
      'scripts/checkCitations.test.ts',
      'scripts/checkCorpus.test.ts',
      'scripts/generateVocab.test.ts',
      'scripts/generateReadingText.test.ts',
    ],
  },
})
