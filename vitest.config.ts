import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['fake-indexeddb/auto'],
    // Agent worktrees live under .claude/worktrees; never sweep them.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
})
