import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['fake-indexeddb/auto'],
    // Agent worktrees live under .claude/worktrees; never sweep them.
    //
    // The manual curation tools under scripts/ are named individually rather
    // than excluding scripts/ wholesale: they need the network, but the
    // convention check beside them is pure and belongs in every run. A new
    // tool that reaches the network has to be added here.
    exclude: [
      ...configDefaults.exclude,
      '.claude/**',
      'scripts/checkCitations.test.ts',
      'scripts/generateVocab.test.ts',
    ],
  },
})
