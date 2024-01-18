import { createRequire } from 'node:module'
import path, { format } from 'node:path'
import { fileURLToPath } from 'node:url'
import typescript from '@rollup/plugin-typescript'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packagesDir)
const resolve = (p) => {
  return path.resolve(packageDir, p)
}
const pkg = require(resolve('package.json'))
const packageOptions = pkg.buildOptions

console.log('packageOptions :', packageOptions)

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  },
}

export default packageOptions.formats.map(format => {
  return createConfig(format, outputConfigs[format])
})

function createConfig(format, output) {
  const isGlobalBuild = /global/.test(format)
  output.sourcemap = true
  if (isGlobalBuild) {
    output.name = packageOptions.name
  }
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      typescript({
        sourceMap: true
      })
    ]
  }
}
