import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/e2e.ts',
    defaultCommandTimeout: 10000, // Increase timeout for Next.js routes
    viewportWidth: 1280,
    viewportHeight: 720,
  },
}) 