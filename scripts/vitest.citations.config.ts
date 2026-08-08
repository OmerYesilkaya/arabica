import { defineConfig } from 'vitest/config'

// Config for the manual citation checker only (network access needed):
//   pnpm exec vitest run --config scripts/vitest.citations.config.ts
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/checkCitations.test.ts'],
    testTimeout: 120_000,
    // The API rate-limits bursts; the script serializes its own requests.
    maxConcurrency: 1,
  },
})
