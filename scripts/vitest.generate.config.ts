import { defineConfig } from 'vitest/config'

// Config for the corpus generators only:
//   pnpm exec vitest run --config scripts/vitest.generate.config.ts
// Kept out of the normal test run: they read the vendored corpus, which the
// app never ships, and the vocabulary scaffold fetches ayah text from the
// network in its emit step. Neither is ever part of `pnpm build`.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/generateVocab.test.ts', 'scripts/generateReadingText.test.ts'],
    testTimeout: 300_000,
    maxConcurrency: 1,
  },
})
