import { NextFunction, Request, Response } from 'express'
import { tasksService } from '../services/tasks'
import {
    ITask,
    ITaskDeleteResponse,
    ITaskPostBody,
    ITaskPutBody,
    TaskMutationParams,
    TaskPostParams
} from '../utils/interfaces/tasks'

async function post(
    req: Request<TaskPostParams, ITask, ITaskPostBody>,
    res: Response<ITask>,
    next: NextFunction
) {
    try {
        const result = await tasksService.addTask(req.params.boardId, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function put(
    req: Request<TaskMutationParams, ITask, ITaskPutBody>,
    res: Response<ITask>,
    next: NextFunction
) {
    try {
        const result = await tasksService.editTask(req.params.id, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(
    req: Request<TaskMutationParams, ITaskDeleteResponse>,
    res: Response<ITaskDeleteResponse>,
    next: NextFunction
) {
    try {
        const id = req.params.id

        await tasksService.deleteTask(req.params.boardId, id)

        res.json({ _id: id })
    } catch (error) {
        next(error)
    }
}

export const tasksControllers = {
    post,
    put,
    deleteOne
}
