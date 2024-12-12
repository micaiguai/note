import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import type { Folder } from '../types'

export async function genDocMap(name: string, description: string, folders: Folder[]) {
  const features = folders.reduce((acc, folder) => {
    return `${acc}- title: ${folder.text}
  link: ${folder.items[0].link}
`
  }, '')
  const content = `---
# https://vitepress.dev/reference/default-theme-home-page
# 该文件自动生成请勿修改
layout: home

hero:
  name: "${name}"
  text: "${description}"
  image:
    src: /320x320.png
    alt: ${name}
  actions:
    - theme: brand
      text: 开始阅读
      link: /notes/100_js/100_var、let、const/

features:
${features}
---
`
  await writeFile(
    resolve(cwd(), '.docs-map.md'),
    content,
    {
      encoding: 'utf-8',
    },
  )
}
