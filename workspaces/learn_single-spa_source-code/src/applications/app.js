import { reroute } from "../navigations/reroute"
import { LIFECYCLE_ENUM, shouldBeActive } from "./app.helpers"

const apps = []

export function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({
    appName,
    loadApp,
    activeWhen,
    customProps,
    status: LIFECYCLE_ENUM.NOT_LOADED
  })
  reroute()
}

export function getAppChanges() {
  const appsToUnmount = []
  const appsToMount = []
  const appsToLoad = []

  apps.forEach(app => {
    const shouldBeActiveFlag = shouldBeActive(app)
    switch (app.status) {
      case LIFECYCLE_ENUM.NOT_LOADED:
      case LIFECYCLE_ENUM.LOADING_SOURCE_CODE:
        if (shouldBeActiveFlag) {
          appsToLoad.push(app)
        }
        break
      case LIFECYCLE_ENUM.NOT_BOOTSTRAPPED:
      case LIFECYCLE_ENUM.BOOTSTRAPPING:
      case LIFECYCLE_ENUM.NOT_MOUNTED:
        if (shouldBeActiveFlag) {
          appsToMount.push(app)
        }
        break
      case LIFECYCLE_ENUM.MOUNTED:
        if (!shouldBeActiveFlag) {
          appsToUnmount.push(app)
        }
    }
  })

  return {
    appsToLoad,
    appsToMount,
    appsToUnmount
  }
}