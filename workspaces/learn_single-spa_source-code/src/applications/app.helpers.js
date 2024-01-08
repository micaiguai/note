export const LIFECYCLE_ENUM = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING_SOURCE_CODE: 'LOADING_SOURCE_CODE',
  NOT_BOOTSTRAPPED: 'NOT_BOOTSTRAPPED',
  BOOTSTRAPPING: 'BOOTSTRAPPING',
  NOT_MOUNTED: 'NOT_MOUNTED',
  MOUNTING: 'MOUNTING',
  MOUNTED: 'MOUNTED',
  UPDATING: 'UPDATING',
  UNMOUNTING: 'UNMOUNTING',
  UNLOADING: 'UNLOADING',
  LOAD_ERR: 'LOAD_ERR',
  SKIP_BECAUSE_BROKEN: 'SKIP_BECAUSE_BROKEN'
}

export function isActive(app) {
  return app.status === LIFECYCLE_ENUM.MOUNTED
}

export function shouldBeActive(app) {
  return app.activeWhen(window.location)
}