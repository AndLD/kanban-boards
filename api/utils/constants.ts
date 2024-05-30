import { IOrder } from './interfaces/boards'

export const startTimestamp = Date.now()

export const environment = process.env.NODE_ENV || 'development'
export const isProduction = environment === 'production'

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

export enum Entity {
    BOARDS = 'boards',
    TASKS = 'tasks'
}

export const initialOrder: IOrder = {
    ToDo: [],
    InProgress: [],
    Done: []
}
