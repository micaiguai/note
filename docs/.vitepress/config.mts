import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vitepress'

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)_([^\.]+)(\.)?(\S+)?/

interface File {
  text: string
  sort: number
  link: string
}
interface Folder {
  text: string
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
    .map((fileInfo, fileInfoIndex) => {
      return {
        ...fileInfo,
        text: `${fileInfoIndex + 1}. ${fileInfo.text}`,
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
      return item !== undefined
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

const folders = (await readdir('/Users/m/zhangshiyu/workspace/my_note/docs/notes'))
  .filter((folderName) => {
    const valid = /(^[0-9]*)_\??.*/.test(folderName)
    return valid
  })
const sidebar = await generateFolders(folders)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/notes',
  title: 'MCG',
  description: 'MCG INTRODUCE',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
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
