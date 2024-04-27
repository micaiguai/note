import { rename } from "fs/promises";
import { getFolders } from "./scan.mjs";
import { dirResolve } from "./utils.mjs";

export async function renameAll() {
  const folders = await getFolders()
  folders.forEach(folder => {
    if (folder.originName !== folder.name) {
      rename(dirResolve('groups', folder.originName), dirResolve('groups', folder.name))
    }
    folder.children.forEach(file => {
      if (!file.extension) {
        rename(dirResolve('groups', folder.name, file.originName), dirResolve('groups', folder.name, `${file.name}.md`))
      }
      // if (file.originName !== `${file.name}.${file.extension}`) {
      //   rename(dirResolve('groups', folder.name, file.originName), dirResolve('groups', folder.name, file.name))
      // }
    })
  })
}

renameAll()
