import { LIFECYCLE_ENUM } from "../applications/app.helpers";

export async function toBootstrapPromise(app) {
  if (app.status !== LIFECYCLE_ENUM.NOT_BOOTSTRAPPED) {
    return app
  }
  app.status = LIFECYCLE_ENUM.BOOTSTRAPPING
  await app.bootstrap(app.customProps)
  app.status = LIFECYCLE_ENUM.NOT_MOUNTED
  return app
}
