import { ID } from '../types'

export interface ITask {
    _id: ID
    title: string
    description?: string
    boardId: ID
}

export interface ITaskPostBody {
    title: string
    description?: string
}

export interface ITaskPost extends ITaskPostBody {
    boardId: ID
}

export interface ITaskPutBody {
    title?: string
    description?: string
}

export interface ITaskDeleteResponse {
    _id: ID
}
