import { ID, TaskStatus } from '../types'

export interface ITask {
    _id: ID
    title: string
    description?: string
    createdAt: number
    status: TaskStatus
    boardId: ID
}

export interface ITaskPostBody {
    title: string
    description?: string
    status: TaskStatus
}

export interface ITaskPost extends ITaskPostBody {
    createdAt: number
    boardId: number
}

export interface ITaskPutBody {
    title?: string
    description?: string
    status: TaskStatus
}
