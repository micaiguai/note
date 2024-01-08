import { LIFECYCLE_ENUM } from "../applications/app.helpers";

export async function toMountPromise(app) {
  if (app.status !== LIFECYCLE_ENUM.NOT_MOUNTED) {
    return app
  }
  app.status = LIFECYCLE_ENUM.MOUNTING
  await app.mount(app.customProps)
  app.status = LIFECYCLE_ENUM.MOUNTED
  return app
}
