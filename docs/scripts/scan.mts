import { readdir, rename } from "fs/promises"
import type { Folder, File } from "."
import { dirResolve } from "./utils.mjs"
import { Dirent } from "fs"

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)?_?\??([^\.]+)(?:\.)?(\S+)?/

export async function getFolders() {
  const folders: Folder[] = (await Promise.all(
    ((await readdir(dirResolve('./groups'))) as string[])
      .map(async (folderName: string) => {
        const [originFolderName, folderOrder, realFolderName] = folderName.match(folderOrFileRegExp) ?? []
        return {
          originName: (originFolderName as string),
          name: realFolderName,
          children: ((await readdir(dirResolve('groups', folderName), { withFileTypes: true })))
            .filter((file: Dirent) => {
              return file.isFile()
            })
            .map((file: Dirent) => {
              const [originFileName, fileOrder, realFileName, extension] = file.name.match(folderOrFileRegExp) ?? []
              return {
                originName: originFileName as string,
                name: realFileName,
                extension: extension
              }
            })
            // .filter((file: File) => {
            //   return file.extension === 'md'
            // })
        }
      })
  ))
    // .filter(folder => !Number.isNaN(folder.order))
  return folders
}