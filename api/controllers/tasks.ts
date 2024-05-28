import { NextFunction, Request, Response } from 'express'
import { tasksService } from '../services/tasks'

async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await tasksService.addTask(req.params.boardId, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await tasksService.editTask(req.params.id, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        await tasksService.deleteTask(id)

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
