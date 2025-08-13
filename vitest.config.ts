/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts'],
    css: true,
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
