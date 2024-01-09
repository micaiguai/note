import { readdir } from 'fs/promises'
import { join, resolve } from 'path'

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)_(\S+)(\.\S+)?/

/**
 * 生成文件夹
 * @param {string[]} folderNames 文件夹名称数组
 * @returns {object[]} 
 */
async function generateFolders(folderNames) {
  let folderInfos = await Promise.all(
    folderNames.map(async folderName => {
      const [entireStr, sortNum, text] = folderName.match(folderOrFileRegExp)
      return {
        text: text,
        sortNum: Number(sortNum),
        items: await generateFiles(folderName)
      }
    })
  )
  folderInfos.sort((folderInfoA, folderInfoB) => {
    return folderInfoA.sortNum - folderInfoB.sortNum
  })
  folderInfos = folderInfos.map((fileInfo, fileInfoIndex) => {
    return {
      ...fileInfo,
      text: `${fileInfoIndex + 1}. ${fileInfo.text}`,
    }
  })
  return folderInfos
}
/**
 * 生成文件
 * @param {string} folderName 文件夹名称
 * @returns {object[]} 
 */
async function generateFiles(folderName) {
  // 读取文件
  const fileNames = await readdir(resolve(process.cwd(), `./${folderName}`))
  // 整理文件信息，排序
  let fileInfos = fileNames.map(fileName => {
    const matchResult = fileName.match(folderOrFileRegExp)
    if (!matchResult) {
      return
    }
    const [entireStr, sortNum, text] = matchResult
    return {
      text,
      sortNum: Number(sortNum),
      link: `/${join(folderName, fileName)}`
    }
  }).filter(item => item)
  fileInfos.sort((fileInfoA, fileInfoB) => {
    return fileInfoA.sortNum - fileInfoB.sortNum
  })
  // 给text序号
  fileInfos = fileInfos.map((fileInfo, fileInfoIndex) => {
    return {
      ...fileInfo,
      text: `${fileInfoIndex + 1}. ${fileInfo.text}`,
    }
  })
  return fileInfos
}

const folders = await generateFolders([
  './100_js',
  './200_设计模式',
  './300_vue2',
  './10000_vitePress',
  './20000_微前端',
])

// /**
//  * 处理文件夹或文件数组
//  * @param {object[]} items 文件夹或文件数组
//  * @returns {object[]} 处理好的文件夹或文件数组
//  */
// .vitepress/config.js
export default {
  // site-level options
  title: 'mcg_notes',
  description: 'notes of mcg',
  base: `${process.env.BASE}`,
  srcDir: '.',
  srcExclude: [
    // 不是以数字开头的文件夹会被忽略
    '[^0-9]**/**/*.md'
  ],
  themeConfig: {
    sidebar: folders
  }
}
