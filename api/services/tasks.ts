import { ObjectId } from 'mongodb'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { Entity } from '../utils/constants'
import { ITask, ITaskPost, ITaskPostBody, ITaskPutBody } from '../utils/interfaces/tasks'
import { ID } from '../utils/types'
import { dbService, tasksCollection } from './db'
import { boardsService } from './boards'

async function addTask(boardId: ID, task: ITaskPostBody) {
    const newTask: ITaskPost = {
        ...task,
        _id: new ObjectId(),
        boardId
    }

    await dbService.withTransaction(async () => {
        await Promise.all([
            tasksCollection.insertOne(newTask),
            boardsService.registerTask(boardId, newTask._id!.toString())
        ])
    })

    return newTask as ITask
}

function editTask(taskId: ID, updates: ITaskPutBody) {
    return dbService.updateOne(Entity.TASKS, taskId, updates) as Promise<ITask>
}

function deleteTask(boardId: ID, id: ID) {
    return dbService.withTransaction(async () => {
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) })

        if (!result.deletedCount) {
            throw new ErrorHandler(404, `Task with id: ${id} not found`)
        }

        await boardsService.unregisterTask(boardId, id)
    })
}

function deleteTasksByBoardId(boardId: ID) {
    return tasksCollection.deleteMany({ boardId })
}

export const tasksService = {
    addTask,
    editTask,
    deleteTask,
    deleteTasksByBoardId
}
