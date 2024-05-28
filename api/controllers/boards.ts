import { NextFunction, Request, Response } from 'express'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'

async function getOneById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const board = await db.collection(entities.BOARDS).findOne({ _id: new ObjectId(id) })

        if (!board) {
            return res.sendStatus(404)
        }

        const result: any = {
            board
        }

        result.tasks = db.collection(entities.TASKS).find({ boardId: board._id.toString() }).toArray()

        const promiseResults = await Promise.all(Object.values(result))

        const keys = Object.keys(result)

        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = promiseResults[i]
        }

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await db.collection(entities.BOARDS).insertOne(req.body)
        res.json({ _id: result.insertedId, ...req.body })
    } catch (error) {
        next(error)
    }
}

async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const updateResult = await db
            .collection(entities.BOARDS)
            .updateOne({ _id: new ObjectId(id) }, { $set: req.body })

        if (updateResult.matchedCount === 0) {
            throw new ErrorHandler(404, `Board with id: ${id} not found`)
        }

        const updated = await db.collection(entities.BOARDS).findOne({ _id: new ObjectId(id) })

        res.json(updated)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id

        const result = await db.collection(entities.BOARDS).deleteOne({ _id: new ObjectId(id) })
        if (!result.deletedCount) {
            return res.sendStatus(404)
        }

        await db.collection(entities.TASKS).deleteMany({ boardId: id })

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
