import { resolve } from 'node:path'
import { cwd } from 'node:process'

export function dirResolve(...paths: string[]) {
  return resolve(cwd(), ...paths)
}
