import { ID } from '../types'
import { ITask } from './tasks'

export interface IBoard {
    _id: ID
    name: string
}

export interface IBoardPostBody {
    name: string
}

export interface IBoardPutBody {
    name: string
}

export interface IFetchBoardResponse {
    board: IBoard
    tasks: ITask[]
}

export interface IBoardDeleteResponse {
    _id: ID
}
