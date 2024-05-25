import { ID } from '../types'

export interface ITask {
    _id: ID
    title: string
    description: string
}

export interface ITaskPostBody {
    title: string
    description?: string
}

export interface ITaskPutBody {
    title?: string
    description?: string
}

export interface ITaskPut extends ITaskPutBody {
    updatedAt: number
}
