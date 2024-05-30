import { MongoClient, Db, ObjectId, WithTransactionCallback, Collection } from 'mongodb'
import { getLogger } from '../utils/logger'
import { ID } from '../utils/types'
import { ITask, ITaskPutBody } from '../utils/interfaces/tasks'
import { IBoard, IBoardPutBody } from '../utils/interfaces/boards'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { Entity } from '../utils/constants'

let mongoClient: MongoClient
export let db: Db
export let boardsCollection: Collection<IBoard>
export let tasksCollection: Collection<ITask>

const logger = getLogger('services/db')

async function init() {
    mongoClient = new MongoClient(process.env.MONGO_DB_URI || 'mongodb://localhost:27017')
    await mongoClient.connect()
    db = mongoClient.db(process.env.MONGO_DB_NAME || 'kanban-boards')
    boardsCollection = db.collection<IBoard>(Entity.BOARDS)
    tasksCollection = db.collection<ITask>(Entity.TASKS)

    logger.info('MongoDB successfully connected')
}

async function close() {
    await mongoClient.close()
}

async function updateOne(entity: Entity, id: ID, updates: IBoardPutBody | ITaskPutBody) {
    const updateResult = await db
        .collection(entity)
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: 'after' })

    if (!updateResult.value) {
        throw new ErrorHandler(
            404,
            `${entity === Entity.BOARDS ? 'Board' : 'Task'} with id: ${id} not found`
        )
    }

    return updateResult.value
}

async function withTransaction(fn: WithTransactionCallback<void>) {
    const session = mongoClient.startSession()

    const result = await session.withTransaction(fn)

    session.endSession()

    return result
}

export const dbService = {
    init,
    close,
    updateOne,
    withTransaction
}
