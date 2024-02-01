import { readdir } from 'node:fs/promises'
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
  let fileInfos = fileNames
    .map(fileName => {
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
    })
    .filter(item => {
      if (!item) {
        return false
      }
      if (/\?/.test(item.text)) {
        return false
      }
      return true
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

const folders = (await readdir('/Users/m/zhangshiyu/workspace/my_note'))
  .map(el => {
    const res = el.match(/(^[0-9]*)_\??.*/)
    if (res) {
      return {
        path: `./${el}`,
        isValid: true
      }
    } else {
      return {
        isValid: false
      }
    }
  })
  .filter(el => el.isValid)
  .map(el => el.path)
const sidebar = await generateFolders(folders)

// /**
//  * 处理文件夹或文件数组
//  * @param {object[]} items 文件夹或文件数组
//  * @returns {object[]} 处理好的文件夹或文件数组
//  */
// .vitepress/config.js
export default {
  // site-level options
  title: 'mcg notes',
  description: 'mcg notes',
  base: `${process.env.BASE}`,
  srcDir: '.',
  srcExclude: [
    // 不是以数字开头的文件夹会被忽略
    '[^0-9]*/**',
    // 600_?typescript/**
    '[0-9]*[?]*/**',
    // 500_node/200_?execa.md
    '**/[0-9]*[?]*'
  ],
  themeConfig: {
    sidebar: sidebar
  }
}
