import { ObjectId } from 'mongodb'
import { ID } from '../utils/types'
import { entities } from '../utils/constants'
import { db, dbService, mongoClient } from './db'
import { IBoardPost, IBoardPostBody, IBoardPutBody } from '../utils/interfaces/boards'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { tasksService } from './tasks'

async function getBoardWithTasks(id: ID) {
    const resultCursor = db.collection(entities.BOARDS).aggregate([
        {
            $match: { _id: new ObjectId(id) }
        },
        {
            $lookup: {
                from: entities.TASKS,
                pipeline: [
                    {
                        $match: {
                            boardId: id
                        }
                    }
                ],
                as: 'tasks'
            }
        },
        {
            $project: {
                tasks: '$tasks',
                _id: 1,
                name: 1,
                order: 1
            }
        },
        {
            $addFields: {
                board: {
                    _id: '$_id',
                    name: '$name',
                    order: '$order'
                }
            }
        },
        {
            $project: {
                _id: 0,
                name: 0,
                order: 0
            }
        }
    ])

    const result = (await resultCursor.toArray())[0]

    if (!result) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`)
    }

    return result
}

async function addBoard(boardBody: IBoardPostBody) {
    const board: IBoardPost = {
        ...boardBody,
        order: {
            ToDo: [],
            InProgress: [],
            Done: []
        }
    }

    const result = await db.collection(entities.BOARDS).insertOne(board)
    return { _id: result.insertedId, ...board }
}

function editBoard(id: ID, updates: IBoardPutBody) {
    return dbService.updateOne(entities.BOARDS, id, updates)
}

async function deleteBoardWithTasks(id: ID) {
    const session = mongoClient.startSession()

    session.withTransaction(async () => {
        const result = await db.collection(entities.BOARDS).deleteOne({ _id: new ObjectId(id) })
        if (!result.deletedCount) {
            throw new ErrorHandler(404, `Board with id: ${id} not found`)
        }

        await tasksService.deleteTasksByBoardId(id)
    })

    session.endSession()
}

async function registerTask(boardId: ID, taskId: ID, initialStatus: string) {
    const updateResult = await db
        .collection(entities.BOARDS)
        .updateOne(
            { _id: new ObjectId(boardId) },
            { $push: { [`order.${initialStatus}`]: taskId } }
        )

    if (!updateResult.modifiedCount) {
        throw new ErrorHandler(404, `Board with id: ${boardId} not found`)
    }
}

function moveTask(boardId: ID, taskId: ID, oldStatus: string, newStatus: string) {
    return db
        .collection(entities.BOARDS)
        .updateOne(
            { _id: new ObjectId(boardId) },
            { $pull: { [`order.${oldStatus}`]: taskId }, $push: { [`order.${newStatus}`]: taskId } }
        )
}

export const boardsService = {
    getBoardWithTasks,
    addBoard,
    editBoard,
    deleteBoardWithTasks,
    registerTask,
    moveTask
}
