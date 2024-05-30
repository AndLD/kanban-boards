import { ID, TaskStatus } from '../types'

export interface ITask {
    _id: ID
    title: string
    description?: string
    status: TaskStatus
    boardId: ID
}

export interface ITaskPostBody {
    title: string
    description?: string
    status: TaskStatus
}

export interface ITaskPost extends ITaskPostBody {
    boardId: ID
}

export interface ITaskPutBody {
    title?: string
    description?: string
    status?: TaskStatus
}

export interface ITaskDeleteResponse {
    _id: ID
}
