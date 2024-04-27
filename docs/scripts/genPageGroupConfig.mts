import { format } from 'prettier'
import { getFolders } from './scan.mts'
import { writeFile } from 'fs/promises'
import { dirResolve } from './utils.mts'

export async function genPageGroupConfig() {
  const json = JSON.stringify({ folders: await getFolders()})
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
