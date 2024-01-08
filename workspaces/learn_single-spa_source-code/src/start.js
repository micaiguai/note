import { reroute } from "./navigations/reroute"

export let startedFlag = false

export function start() {
  startedFlag = true
  reroute()
}
