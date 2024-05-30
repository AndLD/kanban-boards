import { ID } from '../types'
import { ITask } from './tasks'

interface IOrder {
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
    _id: ID
    name: string
    order: IOrder
}

export interface IBoardPostBody {
    name: string
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
