import { ID } from '../types'

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
