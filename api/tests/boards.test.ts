import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import request from 'supertest'
import express from 'express'
import { boardsRouter } from '../routers/boards'
import { clearInsertedDocs, trackInsert } from './dbHelpers'
import { ObjectId } from 'mongodb'
import { boardsCollection, dbService, tasksCollection } from '../services/db'
import { IBoardPostBody, IBoardPutBody } from '../utils/interfaces/boards'
import { Entity, initialOrder } from '../utils/constants'

const app = express()
app.use(express.json())
app.use('/boards', boardsRouter)

beforeAll(async () => {
    await dbService.init()
})

afterAll(async () => {
    await clearInsertedDocs()
    await dbService.close()
})

describe('Boards API', () => {
    test('GET /boards/:id - success', async () => {
        const boardId = new ObjectId()
        const taskId = new ObjectId()

        const promises = [
            boardsCollection.insertOne({
                _id: boardId,
                name: 'Test Board',
                order: {
                    ToDo: [taskId.toString()],
                    InProgress: [],
                    Done: []
                }
            }),
            tasksCollection.insertOne({
                _id: taskId,
                boardId: boardId.toString(),
                title: 'Test Task'
            })
        ]

        await Promise.all(promises)

        trackInsert(Entity.BOARDS, boardId)
        trackInsert(Entity.TASKS, taskId)

        const response = await request(app).get(`/boards/${boardId}`)

        expect(response.status).toBe(200)
        expect(response.body.board.name).toBe('Test Board')
        expect(response.body.tasks).toHaveLength(1)
        expect(response.body.tasks[0].title).toBe('Test Task')

        // Check the integrity of the board's order from response
        expect(response.body.board.order).toBeDefined()
        expect(response.body.board.order.ToDo).toEqual([taskId.toString()])
        expect(response.body.board.order.InProgress).toEqual([])
        expect(response.body.board.order.Done).toEqual([])
    })

    test('GET /boards/:id - invalid id', async () => {
        const invalidBoardId = 'invalidObjectId'
        const response = await request(app).get(`/boards/${invalidBoardId}`)

        expect(response.status).toBe(400)
    })

    test('GET /boards/:id - not found', async () => {
        const response = await request(app).get(`/boards/60d21b4667d0d8992e610c85`)

        expect(response.status).toBe(404)
    })

    test('POST /boards - success', async () => {
        const newBoard: IBoardPostBody = {
            name: 'New Board'
        }

        const response = await request(app).post('/boards').send(newBoard)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('New Board')

        const boardInDb = await boardsCollection.findOne({
            _id: new ObjectId(response.body._id)
        })

        expect(boardInDb?.name).toBe('New Board')
        expect(boardInDb?.order).toEqual(initialOrder)

        if (boardInDb?._id) {
            trackInsert(Entity.BOARDS, boardInDb._id)
        }
    })

    test('POST /boards - invalid data type', async () => {
        const newBoard = { name: 123 } // Invalid data type for 'name' field

        const response = await request(app).post('/boards').send(newBoard)

        expect(response.status).toBe(400)
    })

    test('POST /boards - missing required field', async () => {
        const newTask = {} // Missing the required 'name' field

        const response = await request(app).post(`/boards`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards - no extra fields', async () => {
        const newBoard = { name: 'New Board', a: 1, b: 'abc' } // Extra fields

        const response = await request(app).post('/boards').send(newBoard)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:id - success', async () => {
        const boardId = new ObjectId()
        await boardsCollection.insertOne({
            _id: boardId,
            name: 'Initial Board',
            order: initialOrder
        })
        trackInsert(Entity.BOARDS, boardId)

        const updatedBoard: IBoardPutBody = {
            name: 'Updated Board'
        }

        const response = await request(app).put(`/boards/${boardId}`).send(updatedBoard)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Updated Board')

        const boardInDb = await boardsCollection.findOne({
            _id: boardId
        })

        expect(boardInDb?.name).toBe('Updated Board')
        expect(boardInDb?.order).toEqual(initialOrder)
    })

    test('PUT /boards/:id - missing all fields', async () => {
        const boardId = new ObjectId()
        const updatedBoard = {} // Missing all fields

        const response = await request(app).put(`/boards/${boardId}`).send(updatedBoard)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:id - invalid data type', async () => {
        const boardId = new ObjectId()
        const updatedBoard = { name: 123 } // Invalid data type for 'name' field

        const response = await request(app).put(`/boards/${boardId}`).send(updatedBoard)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:id - invalid id', async () => {
        const updatedBoard = { name: 'Updated Board' }
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).put(`/boards/${invalidBoardId}`).send(updatedBoard)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:id - not found', async () => {
        const response = await request(app)
            .put(`/boards/60d21b4667d0d8992e610c85`)
            .send({ name: 'Updated Board' })

        expect(response.status).toBe(404)
    })

    test('DELETE /boards/:id - success', async () => {
        const boardId = new ObjectId()
        await boardsCollection.insertOne({
            _id: boardId,
            name: 'Test Board',
            order: initialOrder
        })
        trackInsert(Entity.BOARDS, boardId)
        const taskId = new ObjectId()
        await tasksCollection.insertOne({
            _id: taskId,
            boardId: boardId.toString(),
            title: 'Test Task'
        })
        trackInsert(Entity.TASKS, taskId)

        const response = await request(app).delete(`/boards/${boardId}`)

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(boardId.toString())

        const boardInDb = await boardsCollection.findOne({ _id: boardId })
        expect(boardInDb).toBeNull()

        const tasksInDb = await tasksCollection.find({ boardId: boardId.toString() }).toArray()
        expect(tasksInDb).toHaveLength(0)
    })

    test('DELETE /boards/:id - invalid id', async () => {
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).delete(`/boards/${invalidBoardId}`)

        expect(response.status).toBe(400)
    })

    test('DELETE /boards/:id - not found', async () => {
        const response = await request(app).delete(`/boards/60d21b4667d0d8992e610c85`)

        expect(response.status).toBe(404)
    })
})
