import fs from 'fs'
import { cpus } from 'os'
import { execa } from 'execa'

const targets = fs.readdirSync('packages').filter(f => {
  return fs.statSync(`packages/${f}`).isDirectory()
})

function runParallel(source, iteratorFn) {
  const ret = []
  for (const item of source) {
    ret.push(iteratorFn(item))
  }
  return Promise.all(ret)
}

async function build(target) {
  await execa(
    'rollup',
    [
      '-wc',
      '--environment',
      `TARGET:${target}`
    ],
    {
      stdio: 'inherit'
    }
  )
}

runParallel(targets, build)
