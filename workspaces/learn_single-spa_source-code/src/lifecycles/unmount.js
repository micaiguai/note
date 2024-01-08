import { LIFECYCLE_ENUM } from "../applications/app.helpers";

export async function toUnmountPromise(app) {
  if (app.status !== LIFECYCLE_ENUM.MOUNTED) {
    return app
  }
  app.status = LIFECYCLE_ENUM.UNMOUNTING
  await app.unmount(app.customProps)
  app.status = LIFECYCLE_ENUM.NOT_MOUNTED
  return app
}
