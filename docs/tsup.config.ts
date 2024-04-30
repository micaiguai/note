import { defineConfig } from 'tsup'

export default defineConfig({
  sourcemap: true,
  format: ['esm'],
  external: ['esbuild', 'prettier', 'json-diff', 'chokidar'],
  entry: {
    genPageGroupConfig: 'scripts/genPageGroupConfig.mts',
    rename: 'scripts/rename.mts',
    watch: 'scripts/watch.mts',
  },
  clean: true,
})
