import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: true,
  format: ['esm'],
  external: ['esbuild', 'prettier'],
  entry: {
    genPageGroupConfig: 'scripts/genPageGroupConfig.mts'
  }
})
