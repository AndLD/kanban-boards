import { NextFunction, Request, Response } from 'express'
import { boardsService } from '../services/boards'
import {
    BoardFetchParams,
    BoardMutationParams,
    IBoard,
    IBoardDeleteResponse,
    IBoardPostBody,
    IBoardPutBody,
    IFetchBoardResponse
} from '../utils/interfaces/boards'

async function getOneById(
    req: Request<BoardFetchParams, IFetchBoardResponse>,
    res: Response<IFetchBoardResponse>,
    next: NextFunction
) {
    try {
        const result = await boardsService.getBoardWithTasks(req.params.id)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function post(
    req: Request<BoardMutationParams, IBoard, IBoardPostBody>,
    res: Response<IBoard>,
    next: NextFunction
) {
    try {
        const result = await boardsService.addBoard(req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function put(
    req: Request<BoardMutationParams, IBoard, IBoardPutBody>,
    res: Response<IBoard>,
    next: NextFunction
) {
    try {
        const result = await boardsService.editBoard(req.params.id, req.body)

        res.json(result)
    } catch (error) {
        next(error)
    }
}

async function deleteOne(
    req: Request<BoardMutationParams, IBoardDeleteResponse>,
    res: Response<IBoardDeleteResponse>,
    next: NextFunction
) {
    try {
        const id = req.params.id

        await boardsService.deleteBoardWithTasks(id)

        res.json({ _id: id })
    } catch (error) {
        next(error)
    }
}

export const boardsControllers = {
    getOneById,
    post,
    put,
    deleteOne
}
