import { NextFunction, Request, Response } from 'express'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'
import { ITaskPost } from '../utils/interfaces/tasks'

async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const newTask: ITaskPost = {
            ...req.body,
            createdAt: Date.now(),
            boardId: req.params.boardId
        }

        const result = await db.collection(entities.TASKS).insertOne(newTask)
        res.json({ _id: result.insertedId, ...newTask })
    } catch (error) {
        next(error)
    }
}

async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const updateResult = await db
            .collection(entities.TASKS)
            .updateOne({ _id: new ObjectId(id) }, { $set: req.body })

        if (updateResult.matchedCount === 0) {
            throw new ErrorHandler(404, `Task with id: ${id} not found`)
        }

        const updated = await db.collection(entities.TASKS).findOne({ _id: new ObjectId(id) })

        res.json(updated)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const result = await db.collection(entities.TASKS).deleteOne({ _id: new ObjectId(id) })
        if (!result.deletedCount) {
            return res.sendStatus(404)
        }

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
