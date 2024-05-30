import { ObjectId } from 'bson'
import { ID } from '../types'

export interface ITask {
    _id: ObjectId
    title: string
    description?: string
    boardId: ID
}

export interface ITaskPostBody {
    title: string
    description?: string
}

export interface ITaskPost extends ITaskPostBody {
    _id: ObjectId
    boardId: ID
}

export interface ITaskPutBody {
    title?: string
    description?: string
}

export interface ITaskDeleteResponse {
    _id: ID
}

export type TaskPostParams = {
    boardId: string
}

export type TaskMutationParams = {
    boardId: string
    id: string
}
