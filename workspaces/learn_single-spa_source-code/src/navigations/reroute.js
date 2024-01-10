import { getAppChanges } from "../applications/app";
import { startedFlag } from "../start";
import { toLoadPromise } from '../lifecycles/load'
import { toMountPromise } from "../lifecycles/mount";
import { toUnmountPromise } from "../lifecycles/unmount";
import { toBootstrapPromise } from "../lifecycles/bootstrap";
import './navigation-events'

export function reroute() {
  const {
    appsToLoad,
    appsToMount,
    appsToUnmount
  } = getAppChanges()
  if (startedFlag) {
    return performanceChanges()
  } else {
    return loadApps()
  }
  async function performanceChanges() {
    await appsToUnmount.map(toUnmountPromise)
    appsToLoad.map(async app => {
      await toLoadPromise(app)
      await toBootstrapPromise(app)
      await toMountPromise(app)
    })
    appsToMount.map(async app => {
      await toMountPromise(app)
    })
  }
  async function loadApps() {
    const apps = await Promise.all(appsToLoad.map(toLoadPromise))
    return apps
  }
}