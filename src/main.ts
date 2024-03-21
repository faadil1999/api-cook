import { config } from './config'
import { RelationalDatabase } from './infrastructure/database/database'
import { ExternalDependencies } from './infrastructure/routes'
import { Server } from './infrastructure/server'
;(async () => {
  process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.log(err)
    process.exit(1)
  })

  const database = new RelationalDatabase(config)
  const externalDependencies: ExternalDependencies = {
    database
  }

  const server: Server = new Server(config)
  await server.init(externalDependencies)

  await server.start()
})()
