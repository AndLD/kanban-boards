import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'
import { ITaskPost, ITaskPostBody, ITaskPutBody } from '../utils/interfaces/tasks'
import { ID } from '../utils/types'
import { db, dbService } from './db'
import { boardsService } from './boards'

async function _getTask(id: ID) {
    const result = await db.collection(entities.TASKS).findOne({ _id: new ObjectId(id) })

    if (!result) {
        throw new ErrorHandler(404, `Task with id: ${id} not found`)
    }

    return result
}

async function addTask(boardId: ID, task: ITaskPostBody) {
    const newTask: ITaskPost = {
        ...task,
        _id: new ObjectId(),
        boardId
    }

    await dbService.withTransaction(async () => {
        await Promise.all([
            db.collection(entities.TASKS).insertOne(newTask),
            boardsService.registerTask(boardId, newTask._id.toHexString(), newTask.status)
        ])
    })

    return newTask
}

function editTask(boardId: ID, taskId: ID, updates: ITaskPutBody) {
    return dbService.withTransaction(async () => {
        const promises: Promise<any>[] = []

        // If task status is updated during the edit task request, then we should update tasks order in board doc
        if (updates.status) {
            const task = await _getTask(taskId)

            // If status is sent in put request body, but it is actually not changed, then we skip adjusting board order
            if (task.status === updates.status) {
                delete updates.status
            } else {
                promises.push(boardsService.moveTask(boardId, taskId, task.status, updates.status))
            }

            // If status was a single key in updates object, then no need to perform update request, just return queried task as result
            if (Object.keys(updates).length === 0) {
                return task
            }
        }

        promises.push(dbService.updateOne(entities.TASKS, taskId, updates))

        const results = await Promise.all(promises)

        return results[results.length - 1]
    })
}

async function deleteTask(id: ID) {
    const result = await db.collection(entities.TASKS).deleteOne({ _id: new ObjectId(id) })

    if (!result.deletedCount) {
        throw new ErrorHandler(404, `Task with id: ${id} not found`)
    }
}

function deleteTasksByBoardId(boardId: ID) {
    return db.collection(entities.TASKS).deleteMany({ boardId })
}

export const tasksService = {
    addTask,
    editTask,
    deleteTask,
    deleteTasksByBoardId
}
