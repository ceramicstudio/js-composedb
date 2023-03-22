export type ServiceLifecycle = {
  /**
   * Method called by runner after all services have been created and the routers attached.
   * Services should not call other services until this method is called.
   */
  start?: () => void

  /**
   * Method called by runner to signal service must be stopped.
   * Services should stop interacting with other services and run their cleanup logic.
   */
  stop?: () => void | Promise<void>
}
