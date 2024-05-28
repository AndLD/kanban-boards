import { ObjectId } from 'mongodb'
import { ID } from '../utils/types'
import { entities } from '../utils/constants'
import { db, dbService } from './db'
import { IBoardPostBody, IBoardPutBody } from '../utils/interfaces/boards'
import { ErrorHandler } from '../middlewares/ErrorHandler'

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
                            $expr: { $eq: ['$boardId', id] }
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
                name: 1
            }
        },
        {
            $addFields: {
                board: {
                    _id: '$_id',
                    name: '$name'
                }
            }
        },
        {
            $project: {
                _id: 0,
                name: 0
            }
        }
    ])

    const result = (await resultCursor.toArray())[0]

    if (!result) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`)
    }

    return result
}

async function addBoard(board: IBoardPostBody) {
    const result = await db.collection(entities.BOARDS).insertOne(board)
    return { _id: result.insertedId, ...board }
}

async function editBoard(id: ID, updates: IBoardPutBody) {
    return await dbService.updateOne(entities.BOARDS, id, updates)
}

async function deleteBoardWithTasks(id: ID) {
    const result = await db.collection(entities.BOARDS).deleteOne({ _id: new ObjectId(id) })
    if (!result.deletedCount) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`)
    }

    await db.collection(entities.TASKS).deleteMany({ boardId: id })
}

export const boardsService = {
    getBoardWithTasks,
    addBoard,
    editBoard,
    deleteBoardWithTasks
}
