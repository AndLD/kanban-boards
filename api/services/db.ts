import { MongoClient, Db } from 'mongodb'
import { getLogger } from '../utils/logger'

export let mongoClient: MongoClient
export let db: Db

const logger = getLogger('services/db')

async function init() {
    mongoClient = new MongoClient(
        process.env.MONGO_DB_URI || 'mongodb://localhost:27017'
    )
    await mongoClient.connect()
    db = mongoClient.db(process.env.MONGO_DB_NAME || 'kanban-boards')

    logger.info('MongoDB successfully connected')
}

export const dbService = {
    init
}
