import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['fake-indexeddb/auto'],
    // Agent worktrees live under .claude/worktrees; never sweep them.
    // scripts/ holds manual curation tools that need network; run them
    // via their own config (see scripts/vitest.citations.config.ts).
    exclude: [...configDefaults.exclude, '.claude/**', 'scripts/**'],
  },
})
