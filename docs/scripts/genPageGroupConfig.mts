import { writeFile } from 'node:fs/promises'
import { format } from 'prettier'
import { getFolders } from './scan.mts'
import { dirResolve } from './utils.mts'

export async function genPageGroupConfig() {
  const json = JSON.stringify({ folders: await getFolders() })
  const jsonPrettier = await format(
    json,
    {
      parser: 'json',
    },
  )
  writeFile(
    dirResolve('./order.json'),
    jsonPrettier,
  )
}
genPageGroupConfig()
