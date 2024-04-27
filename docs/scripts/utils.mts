import { resolve } from "path";

export function dirResolve(...paths: string[]) {
  return resolve(process.cwd(), ...paths)
}
