/* eslint-disable regexp/no-useless-escape */
/* eslint-disable regexp/no-misleading-capturing-group */
/* eslint-disable regexp/optimal-quantifier-concatenation */

/* eslint-disable regexp/no-unused-capturing-group */
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { cwd, env } from 'node:process'
import { defineConfig } from 'vitepress'
import { genIndexMd } from './utils/genIndexMd'
import type { File, Folder } from './types'

const config = {
  title: 'MCG笔记',
  description: 'MCG的学习和理解笔记',
}

const folderOrFileRegExp = /(?:\.\/)?(\d+)_([^\.]+)(\.)?(\S+)?/

/**
 * 生成文件夹数组信息
 * @param folderNames 文件夹名称数组
 * @returns 文件夹数组信息
 */
async function generateFolders(folderNames: string[]) {
  let folderInfos: Folder[] = (await Promise.all(
    folderNames.map(async (folderName) => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const [entireStr, sortNum, plainName] = folderName.match(folderOrFileRegExp)!
      return {
        meta: {
          plainName,
          folderName,
          sort: +sortNum,
        },
        text: plainName,
        items: await generateFiles(folderName),
      }
    }),
  ))
  folderInfos = folderInfos
    .sort((folderInfoA, folderInfoB) => {
      return folderInfoA.meta.sort - folderInfoB.meta.sort
    })
  return folderInfos
}
/**
 * 生成文件
 * @param folderName 文件夹名称
 * @returns 生成文件的名称
 */
async function generateFiles(folderName: string) {
  /** 文件夹下的文件名称列表 */
  const fileNames = await readdir(resolve(cwd(), 'notes', folderName))
  // 整理文件信息，排序
  const fileInfos = fileNames
    // 提取文件信息
    .map((fileName) => {
      const matchResult = fileName.match(folderOrFileRegExp)
      if (matchResult === null) {
        return undefined
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      const [entireStr, sortNum, text, dot, extension] = matchResult
      const isFile = !!extension
      return {
        text,
        link: isFile ? `/${join('notes', folderName, fileName)}` : `/${join('notes', folderName, fileName, 'index.md')}`,
        meta: {
          sort: +sortNum,
          extension,
        },
      }
    })
    // 过滤空 或 拓展不是markdown的文件
    .filter((item) => {
      if (item === undefined) {
        return false
      }
      if (item.meta.extension === undefined) {
        return true
      }
      return item.meta.extension === 'md'
    })
    // 排序
    .sort((fileInfoA, fileInfoB) => {
      return fileInfoA!.meta.sort - fileInfoB!.meta.sort
    })
    // 给text序号
    .map((fileInfo, fileInfoIndex) => {
      return {
        ...fileInfo,
        text: `${fileInfoIndex + 1}. ${fileInfo!.text}`,
      }
    })
  return (fileInfos as any as File[])
}

const originFolders = (await readdir(resolve(cwd(), 'notes')))
  .filter((folderName) => {
    const valid = /(^\d*)_\??.*/.test(folderName)
    return valid
  })
const folders = await generateFolders(originFolders)
const sidebar = genSidebar(folders)

function genSidebar(folders: Folder[]) {
  const result = {}
  folders.forEach((folder) => {
    result[`/notes/${folder.meta.folderName}/`] = folder.items
  })
  return result
}

function genNav(folder: Folder) {
  return {
    text: folder.meta.plainName,
    link: folder.items[0].link,
    activeMatch: `/${folder.meta.folderName}/`,
  }
}

await genIndexMd(config.title, config.description, folders)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: env.NODE_ENV === 'production' ? '/notes/' : '',
  title: config.title,
  description: config.description,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      ...folders.slice(0, 5).map(folder => genNav(folder)),
      {
        text: 'more',
        items: folders.slice(5).map(folder => genNav(folder)),
      },
    ],
    search: {
      provider: 'local',
    },
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/micaiguai' },
    ],
  },
})
