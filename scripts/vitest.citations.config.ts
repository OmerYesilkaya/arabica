import { defineConfig } from 'vitest/config'

// Config for the manual text checkers only (network access needed):
//   pnpm exec vitest run --config scripts/vitest.citations.config.ts
// checkCitations verifies the Quranic quotations in Content; checkCorpus
// verifies that the reading corpus is verbatim Tanzil.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/checkCitations.test.ts', 'scripts/checkCorpus.test.ts'],
    testTimeout: 120_000,
    // The API rate-limits bursts; the script serializes its own requests.
    maxConcurrency: 1,
  },
})
