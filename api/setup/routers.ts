import { Express, Router } from 'express'
import { boardsRouter } from '../routers/boards'

export function setupRouters(app: Express) {
    const apiRouter = Router()
    app.use('/api', apiRouter)
    apiRouter.use('/boards', boardsRouter)
}
