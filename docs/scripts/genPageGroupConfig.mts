import { readdir, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { format } from 'prettier'

console.log('format :', format)

function dirResolve(path: string) {
  return resolve(process.cwd(), path)
}

const folderOrFileRegExp = /(?:\.\/)?([0-9]+)_\??([^\.]+)(?:\.)?(\S+)?/

type File = {
  name: string
  order: number
  extension: 'md' | string
}

type Folder = {
  name: string
  order: number
  children: File[]
}

export async function genPageGroupConfig() {
  const folders: Folder[] = (await Promise.all(
    ((await readdir(dirResolve('./groups'))) as string[])
      .map(async (folderName: string) => {
        const [originFolder, folderOrder, realFolderName] = folderName.match(folderOrFileRegExp) ?? []
        return {
          order: +folderOrder,
          name: realFolderName,
          children: ((await readdir(dirResolve(`./groups/${folderName}`))) as string[])
            .map((fileName: string) => {
              const [originFile, fileOrder, realFileName, extension] = fileName.match(folderOrFileRegExp) ?? []
              return {
                order: +fileOrder,
                name: realFileName,
                extension: extension
              }
            })
            .filter((file: File) => {
              console.log('file :', file)
              return file.extension === 'md'
            })
            .sort((a: File, b: File) => a.order - b.order)
        }
      })
  ))
    .filter(folder => !Number.isNaN(folder.order))
    .sort((a: Folder, b: Folder) => a.order - b.order)
  const json = JSON.stringify({folders})
  debugger
  // console.log('json :', json)
  const jsonPrettier = await format(
    json,
    {
      parser: 'json'
    }
  )
  console.log('jsonPrettier :', jsonPrettier)
  writeFile(
    dirResolve('./order.json'), 
    jsonPrettier
  )
}
genPageGroupConfig()
