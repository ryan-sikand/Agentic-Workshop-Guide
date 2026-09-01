import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // Honor a port handed down by the environment so tooling that assigns one
    // does not end up pointing at a different port than the dev server picks.
    port: Number(process.env.PORT) || 5173,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
