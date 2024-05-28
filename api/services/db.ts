import { MongoClient, Db, ObjectId } from 'mongodb'
import { getLogger } from '../utils/logger'
import { Collection, ID } from '../utils/types'
import { ITaskPutBody } from '../utils/interfaces/tasks'
import { IBoardPutBody } from '../utils/interfaces/boards'
import { ErrorHandler } from '../middlewares/ErrorHandler'
import { entities } from '../utils/constants'

export let mongoClient: MongoClient
export let db: Db

const logger = getLogger('services/db')

async function init() {
    mongoClient = new MongoClient(process.env.MONGO_DB_URI || 'mongodb://localhost:27017')
    await mongoClient.connect()
    db = mongoClient.db(process.env.MONGO_DB_NAME || 'kanban-boards')

    logger.info('MongoDB successfully connected')
}

async function close() {
    await mongoClient.close()
}

async function updateOne(entity: Collection, id: ID, updates: IBoardPutBody | ITaskPutBody) {
    const updateResult = await db
        .collection(entity)
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: 'after' })

    if (!updateResult.value) {
        throw new ErrorHandler(404, `${entity === entities.BOARDS ? 'Board' : 'Task'} with id: ${id} not found`)
    }

    return updateResult.value
}

export const dbService = {
    init,
    close,
    updateOne
}
