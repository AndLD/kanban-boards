import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'
import { ITaskPost, ITaskPostBody, ITaskPutBody } from '../utils/interfaces/tasks'
import { ID } from '../utils/types'
import { db, dbService } from './db'

async function addTask(boardId: ID, task: ITaskPostBody) {
    const newTask: ITaskPost = {
        ...task,
        createdAt: Date.now(),
        boardId
    }

    const insertResult = await db.collection(entities.TASKS).insertOne(newTask)

    return { _id: insertResult.insertedId, ...newTask }
}

async function editTask(id: ID, updates: ITaskPutBody) {
    return await dbService.updateOne(entities.TASKS, id, updates)
}

async function deleteTask(id: ID) {
    const result = await db.collection(entities.TASKS).deleteOne({ _id: new ObjectId(id) })

    if (!result.deletedCount) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`)
    }
}

export const tasksService = {
    addTask,
    editTask,
    deleteTask
}
