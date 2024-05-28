import { NextFunction, Request, Response } from 'express'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'
import { boardsService } from '../services/boards'

async function getOneById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const result = await boardsService.getBoardWithTasks(id)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await boardsService.addBoard(req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await boardsService.editBoard(req.params.id, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        await boardsService.deleteBoardWithTasks(id)

        res.json({ _id: id })
    } catch (error) {
        next(error)
    }
}

export const boardsControllers = {
    getOneById,
    post,
    put,
    deleteOne
}
