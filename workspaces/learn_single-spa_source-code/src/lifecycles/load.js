import { LIFECYCLE_ENUM } from "../applications/app.helpers";

function flatFnArray(fns) {
  fns = Array.isArray(fns) ? fns : [fns]
  return (props) => {
    return fns.reduce(async (promise, fn) => {
      return promise.then(() => fn(props))
    }, Promise.resolve())
  }
}

export async function toLoadPromise(app) {
  if (app.loadPromise) {
    return app.loadPromise
  }
  return (app.loadPromise = Promise.resolve().then(async () => {
    app.status = LIFECYCLE_ENUM.LOADING_SOURCE_CODE
    const {
      bootstrap,
      mount,
      unmount
    } = await app.loadApp(app.customProps)
    app.bootstrap = flatFnArray(bootstrap)
    app.mount = flatFnArray(mount)
    app.unmount = flatFnArray(unmount)
    app.status = LIFECYCLE_ENUM.NOT_BOOTSTRAPPED
    return app
  }))
}
