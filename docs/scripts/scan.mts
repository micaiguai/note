import { readdir } from 'node:fs/promises'
import type { Dirent } from 'node:fs'
import { dirResolve } from './utils.mjs'
import type { Folder } from '.'

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)?_?\??([^\.]+)(?:\.)?(\S+)?/

export async function getFolders() {
  const folders: Folder[] = (await Promise.all(
    ((await readdir(dirResolve('./groups'))) as string[])
      .map(async (folderName: string) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const [originFolderName, folderOrder, realFolderName] = folderName.match(folderOrFileRegExp) ?? []
        return {
          originName: (originFolderName as string),
          name: realFolderName,
          children: ((await readdir(dirResolve('groups', folderName), { withFileTypes: true })))
            .filter((file: Dirent) => {
              return file.isFile()
            })
            .map((file: Dirent) => {
              // eslint-disable-next-line unused-imports/no-unused-vars
              const [originFileName, fileOrder, realFileName, extension] = file.name.match(folderOrFileRegExp) ?? []
              return {
                originName: originFileName as string,
                name: realFileName,
                extension,
              }
            }),
          // .filter((file: File) => {
          //   return file.extension === 'md'
          // })
        }
      }),
  ))
  // .filter(folder => !Number.isNaN(folder.order))
  return folders
}
