import { Router } from 'express'
import { validate } from 'simple-express-validation'
import { tasksRouter } from './tasks'
import { boardsControllers } from '../controllers/boards'
import { boardsSchemas } from '../validation/boards'

export const boardsRouter = Router()
    .get('/:id', boardsControllers.getOneById)
    .post(
        '/',
        validate({
            _allowedProps: ['name'],
            name: {
                required: true,
                type: 'string'
            }
        }),
        boardsControllers.post
    )
    .put('/:id', validate(boardsSchemas.put.body, boardsSchemas.put.params), boardsControllers.put)
    .delete('/:id', validate(null, boardsSchemas.deleteOne.params), boardsControllers.deleteOne)
    .use('/:boardId/tasks', tasksRouter)
