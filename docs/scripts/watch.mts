import { readFile } from 'node:fs/promises'
import type { Stats } from 'node:fs'
import { diff } from 'json-diff'
import { watch } from 'chokidar'
import { dirResolve } from './utils.mts'
import { configFilename } from './config.mts'
import type { Folder } from '.'

type Flag = ' ' | '~' | '+' | '-'

interface WrapNewAndOld<T> {
  __new: T
  __old: T
}
type WrapItem<T> = [
  Flag,
  T,
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
  let ready = false
  const jsonSnapshot = await readFile(dirResolve('docs', configFilename), { encoding: 'utf-8' })
  const json = await readFile(dirResolve('docs', configFilename), { encoding: 'utf-8' })
  const diffResult: { folders: RecurseWrap<Folder> } = diff(JSON.parse(jsonSnapshot), JSON.parse(json), { full: true })
  const watcher = watch(dirResolve('docs', 'notes'))
  watcher
    .on('ready', () => ready = true)
    .on('all', (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string, stats?: Stats) => {
      if (!ready)
        return
      console.log(eventName, path)
    })
  return diffResult
}

watchGroups()
