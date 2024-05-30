import { ObjectId } from 'mongodb'
import { ID } from '../types'
import { ITask } from './tasks'

export interface IOrder {
    ToDo: ID[]
    InProgress: ID[]
    Done: ID[]
}

interface IOrderOptional {
    ToDo?: ID[]
    InProgress?: ID[]
    Done?: ID[]
}

export interface IBoard {
    _id: ObjectId
    name: string
    order: IOrder
}

export interface IBoardPostBody {
    name: string
}

export interface IBoardPost extends IBoardPostBody {
    _id: ObjectId
    order: IOrder
}

export interface IBoardPutBody {
    name?: string
    order?: IOrderOptional
}

export interface IFetchBoardResponse {
    board: IBoard
    tasks: ITask[]
}

export interface IBoardDeleteResponse {
    _id: ID
}

export type BoardFetchParams = {
    id: string
}

export type BoardMutationParams = {
    id: string
}
