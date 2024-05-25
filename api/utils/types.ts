import { NextFunction, Request, Response } from 'express'

export type Collection = 'boards' | 'tasks'

export type Controller = (
    req: Request,
    res: Response,
    next?: NextFunction
) => any

export type Error = {
    msg: string
    code: number
}

export type Any = { [key: string]: any }

export type ID = string
