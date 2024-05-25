import { ID } from '../types'

export interface IBoard {
    _id: ID
    title: string
    description: string
}

export interface IBoardPostBody {
    title: string
    description?: string
}

export interface IBoardPutBody {
    title?: string
    description?: string
}

export interface IBoardPut extends IBoardPutBody {
    updatedAt: number
}
