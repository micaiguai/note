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
      console.log('folderName :', folderName)
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
    console.log('fileName :', fileName)
    const [entireStr, sortNum, text] = fileName.match(folderOrFileRegExp)
    console.log('text :', text)
    console.log('join(folderName, text) :', join(folderName, text))
    return {
      text,
      sortNum: Number(sortNum),
      link: join(folderName, text)
    }
  })
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
  './200_设计模式'
])
// /**
//  * 处理文件夹或文件数组
//  * @param {object[]} items 文件夹或文件数组
//  * @returns {object[]} 处理好的文件夹或文件数组
//  */
// .vitepress/config.js
export default {
  // site-level options
  title: 'VitePress2',
  description: 'Just playing around.adasdasd',
  base: folders[0].items[0].link,
  srcDir: '.',
  srcExclude: [
    // 不是以数字开头的文件夹会被忽略
    '[^0-9]**/**/*.md'
  ],
  themeConfig: {
    sidebar: folders
  }
}