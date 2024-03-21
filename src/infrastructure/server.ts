import bodyParser from 'body-parser'
import express, { Application, Router } from 'express'
import { Config } from '../config'
import { ExternalDependencies, getRoutes } from './routes'

export class Server {
  public expressServer: Application

  constructor(private readonly config: Config) {
    this.config = config

    this.expressServer = express()

    this.expressServer.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      next()
    })
    /**
     * Health Check endpoints
     */
    this.expressServer.get('/status', (req, res) => {
      res.status(200).end()
    })

    // Middleware that transforms the raw string of req.body into json
    this.expressServer.use(bodyParser.json())
  }

  private route(routes: Router[]) {
    // Load API routes
    this.expressServer.use('/api', routes)
  }

  async init(externalDependencies: ExternalDependencies): Promise<void> {
    this.route(getRoutes(externalDependencies))
  }

  async start(): Promise<void> {
    this.expressServer.listen(this.config.server.port, () => {
      console.log(`
            ################################################
            🛡️  Server listening on port: ${this.config.server.port} 🛡️ 
            ################################################
          `)
    })
  }
}
