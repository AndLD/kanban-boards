import { Express, Router } from 'express'

export function setupRouters(app: Express) {
    const apiRouter = Router()
    app.use('/api', apiRouter)
}
