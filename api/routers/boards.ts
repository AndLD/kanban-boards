import { Router } from 'express'
import { validate } from 'simple-express-validation'
import { tasksRouter } from './tasks'
import { boardsControllers } from '../controllers/boards'
import { boardsSchemas } from '../validation/boards'

export const boardsRouter = Router()
    .get('/:id', validate(null, boardsSchemas.getOne.params), boardsControllers.getOneById)
    .post('/', validate(boardsSchemas.post.body), boardsControllers.post)
    .put('/:id', validate(boardsSchemas.put.body, boardsSchemas.put.params), boardsControllers.put)
    .delete('/:id', validate(null, boardsSchemas.deleteOne.params), boardsControllers.deleteOne)
    .use('/:boardId/tasks', tasksRouter)
