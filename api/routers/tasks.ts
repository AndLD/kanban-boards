import { Router } from 'express'
import { validate } from 'simple-express-validation'
import { tasksControllers } from '../controllers/tasks'
import { tasksSchemas } from '../validation/tasks'

export const tasksRouter = Router({ mergeParams: true })
    .post('/', validate(tasksSchemas.post.body, tasksSchemas.post.params), tasksControllers.post)
    .put('/:id', validate(tasksSchemas.put.body, tasksSchemas.put.params), tasksControllers.put)
    .delete('/:id', validate(null, tasksSchemas.deleteOne.params), tasksControllers.deleteOne)
