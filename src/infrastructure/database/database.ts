import { PrismaClient } from '@prisma/client'

import { Config } from '../../config'

export class RelationalDatabase {
  client: PrismaClient

  constructor(config: Config) {
    this.client = new PrismaClient({ datasources: { db: { url: config.database.url } } })
  }

  async getHealth() {
    await this.client.$queryRaw`SELECT VERSION()`
  }
}
