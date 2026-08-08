import { defineConfig } from 'vitest/config'

// Config for the one-shot vocabulary scaffold generator only:
//   pnpm exec vitest run --config scripts/vitest.generate.config.ts
// Kept out of the normal test run: it reads the vendored corpus and, in its
// emit step, fetches ayah text from the network.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/generateVocab.test.ts'],
    testTimeout: 300_000,
    maxConcurrency: 1,
  },
})
