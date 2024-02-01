#!/usr/bin/env zx
import { join } from 'path'

const WORKSPACE_PATH = '/Users/m/zhangshiyu/workspace'
const GITHUB_IO_NAME = 'my_micaiguai.github.io'
const destPath = join(WORKSPACE_PATH, GITHUB_IO_NAME)
const distPath = join(WORKSPACE_PATH, 'my_note/.vitepress')

await $`pnpm run docs:build`
await $`mv ${distPath}/dist ${destPath}`
await $`rm -rf ${destPath}/notes`
await $`cd ${destPath} && mv dist notes`
await $`rm -rf ${destPath}/dist`

await $`cd ${destPath} && git add . && git commit -m "feat: deploy notes" && git pull && git push`
console.log('site: https://micaiguai.github.io/notes/')
