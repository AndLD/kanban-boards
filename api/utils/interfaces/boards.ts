import { ID } from '../types'

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

export interface IBoardPost extends IBoardPostBody {
    order: IOrder
}

export interface IBoardPutBody {
    name?: string
    order?: IOrderOptional
}
