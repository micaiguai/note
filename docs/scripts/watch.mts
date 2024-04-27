import { watch } from "fs"
import { dirResolve } from "./utils.mts"
import { readFile, readdir } from "fs/promises"
import { diff } from 'json-diff'
// import { detailedDiff } from 'deep-object-diff'
import { Folder } from "."

type Flag = ' ' | '~' | '+' | '-'

type WrapNewAndOld<T> = {
  __new: T
  __old: T
}
type WrapItem<T> = [
  Flag,
  T
]

export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

type RecurseWrap<T extends unknown[] | object> = {
  [K in keyof T]: T[K] extends unknown[]
    ? WrapItem<RecurseWrap<T[K]>>
    : T[K] extends object
      ? RecurseWrap<T[K]>
      : T[K] extends number | string
        ? WrapNewAndOld<T[K]> | T[K]
        : never
}

async function watchGroups() {
  // let jsonSnapshot = await readFile(dirResolve('order.json'), { encoding: 'utf-8' })
  // console.log('orderJson :', orderJson)
  watch(dirResolve('groups'), { recursive: true }, async (cur, filename) => {
    console.log('filename :', filename)
    // const dirResult = await readdir(dirResolve('groups'), { recursive: true })
    // console.log('dirResult :', dirResult)
    // const json = await readFile(dirResolve('order.json'), { encoding: 'utf-8' })
    // console.log('json :', json)
    // const diffResult: { folders: RecurseWrap<Folder[]> } = diff(JSON.parse(jsonSnapshot), JSON.parse(json), { full: true })
    // diff(JSON.parse(jsonSnapshot), JSON.parse(json))
    // jsonSnapshot = json
    // const folders = diffResult.folders
    // if (typeof folders[0].name === 'object') {
    //   folders[0].name.__new = '123'
    // }
  })
  dirResolve()
}

// function diff(oldItems: Folder[], newItems: Folder[]) {
//   let oldStart = 0
//   let oldEnd = oldItems.length - 1
//   let newStart = 0
//   let newEnd = newItems.length - 1
  
// }

watchGroups()
