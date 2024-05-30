import { ObjectId } from 'mongodb'
import { ID } from '../utils/types'
import { Entity, initialOrder } from '../utils/constants'
import { boardsCollection, dbService } from './db'
import {
    IBoard,
    IBoardPost,
    IBoardPostBody,
    IBoardPutBody,
    IFetchBoardResponse
} from '../utils/interfaces/boards'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { tasksService } from './tasks'

async function getBoardWithTasks(id: ID) {
    const resultCursor = boardsCollection.aggregate([
        {
            $match: { _id: new ObjectId(id) }
        },
        {
            $lookup: {
                from: Entity.TASKS,
                pipeline: [
                    {
                        $match: {
                            boardId: id
                        }
                    }
                ],
                as: Entity.TASKS
            }
        },
        {
            $project: {
                tasks: `$${Entity.TASKS}`,
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

    return result as IFetchBoardResponse
}

async function addBoard(boardBody: IBoardPostBody) {
    const board: IBoardPost = {
        ...boardBody,
        _id: new ObjectId(),
        order: initialOrder
    }

    const result = await boardsCollection.insertOne(board)

    if (!result.acknowledged) {
        throw new ErrorHandler(500, 'Board was not stored!')
    }

    return board
}

function editBoard(id: ID, updates: IBoardPutBody) {
    return dbService.updateOne(Entity.BOARDS, id, updates) as Promise<IBoard>
}

function deleteBoardWithTasks(id: ID) {
    return dbService.withTransaction(async () => {
        const result = await boardsCollection.deleteOne({ _id: new ObjectId(id) })
        if (!result.deletedCount) {
            throw new ErrorHandler(404, `Board with id: ${id} not found`)
        }

        await tasksService.deleteTasksByBoardId(id)
    })
}

async function registerTask(boardId: ID, taskId: ID) {
    const updateResult = await boardsCollection.updateOne(
        { _id: new ObjectId(boardId) },
        { $push: { [`order.ToDo`]: taskId } }
    )

    if (!updateResult.matchedCount) {
        throw new ErrorHandler(404, `Board with id: ${boardId} not found`)
    }
}

async function unregisterTask(boardId: ID, taskId: ID) {
    const updateResult = await boardsCollection.updateOne(
        { _id: new ObjectId(boardId) },
        { $pull: { 'order.ToDo': taskId, 'order.InProgress': taskId, 'order.Done': taskId } }
    )

    if (!updateResult.matchedCount) {
        throw new ErrorHandler(404, `Board with id: ${boardId} not found`)
    }
}

export const boardsService = {
    getBoardWithTasks,
    addBoard,
    editBoard,
    deleteBoardWithTasks,
    registerTask,
    unregisterTask
}
