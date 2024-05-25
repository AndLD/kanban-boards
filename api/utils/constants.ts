import { Collection } from './types'

export const startTimestamp = Date.now()

export const environment = process.env.NODE_ENV || 'development'
export const isProduction = environment === 'production'

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

export const errors = {
    DOC_NOT_FOUND: { msg: 'The document does not exist', code: 404 },
    BAD_REQUEST: { msg: 'Bad request', code: 400 },
    EMPTY_BODY: { msg: 'Empty body', code: 400 },
    INTERNAL_SERVER_ERROR: { msg: 'Internal server error', code: 500 }
}

export const entities = {
    BOARDS: 'boards' as Collection,
    TASKS: 'tasks' as Collection
}
