import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vitepress'
import Nzh from 'nzh'

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)_([^\.]+)(\.)?(\S+)?/

interface File {
  text: string
  sort: number
  link: string
}
interface Folder {
  text: string
  plainName: string
  folderName: string
  sort: number
  items: File[]
}

/**
 * 生成文件夹数组信息
 * @param folderNames 文件夹名称数组
 * @returns 文件夹数组信息
 */
async function generateFolders(folderNames) {
  let folderInfos: Folder[] = await Promise.all(
    folderNames.map(async (folderName) => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const [entireStr, sortNum, text] = folderName.match(folderOrFileRegExp)
      return {
        folderName,
        text,
        sort: +sortNum,
        items: await generateFiles(folderName),
      }
    }),
  )
  folderInfos = folderInfos
    .sort((folderInfoA, folderInfoB) => {
      return folderInfoA.sort - folderInfoB.sort
    })
    .map((folderInfo, folderInfoIndex) => {
      return {
        ...folderInfo,
        plainName: folderInfo.text,
        folderName: folderInfo.folderName,
        text: `${Nzh.cn.encodeS(folderInfoIndex + 1)}、${folderInfo.text}`,
      }
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
      if (matchResult === null)
        return undefined
      // eslint-disable-next-line unused-imports/no-unused-vars
      const [entireStr, sortNum, text, dot, extension] = matchResult
      const isFile = !!extension
      return {
        text,
        sort: +sortNum,
        link: isFile ? `/${join('notes', folderName, fileName)}` : `/${join('notes', folderName, fileName, 'index.md')}`,
        meta: {
          extension,
        },
      }
    })
    // 过滤空 或 拓展不是markdown的文件
    .filter((item) => {
      if (item === undefined)
        return false
      if (item.meta.extension === undefined)
        return true
      return item.meta.extension === 'md'
    })
    // 排序
    .sort((fileInfoA, fileInfoB) => {
      return fileInfoA!.sort - fileInfoB!.sort
    })
    // 给text序号
    .map((fileInfo, fileInfoIndex) => {
      return {
        ...fileInfo,
        text: `${fileInfoIndex + 1}. ${fileInfo!.text}`,
      }
    })
  return fileInfos
}

const folders = (await readdir(resolve(cwd(), 'notes')))
  .filter((folderName) => {
    const valid = /(^[0-9]*)_\??.*/.test(folderName)
    return valid
  })
const originSidebar = await generateFolders(folders)
const sidebar = genSidebar(originSidebar)

function genSidebar(originSidebar: Folder[]) {
  const result = {}
  originSidebar.forEach((folder) => {
    result[`/notes/${folder.folderName}/`] = folder.items
  })
  console.log('result :', result)
  return result
}

function genNav(folder: Folder) {
  return {
    text: folder.plainName,
    link: folder.items[0].link,
    activeMatch: `/${folder.folderName}/`,
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: 'MCG',
  description: 'MCG INTRODUCE',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      ...originSidebar.slice(0, 5).map(folder => genNav(folder)),
      {
        text: 'more',
        items: originSidebar.slice(5).map(folder => genNav(folder)),
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
