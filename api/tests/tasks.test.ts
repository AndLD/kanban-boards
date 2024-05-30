import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import request from 'supertest'
import express from 'express'
import { tasksRouter } from '../routers/tasks'
import { clearInsertedDocs, trackInsert } from './dbHelpers'
import { ObjectId } from 'mongodb'
import { boardsCollection, dbService, tasksCollection } from '../services/db'
import { Entity } from '../utils/constants'

const app = express()
app.use(express.json())
app.use('/boards/:boardId/tasks', tasksRouter)

beforeAll(async () => {
    await dbService.init()
})

afterAll(async () => {
    await clearInsertedDocs()
    await dbService.close()
})

describe('Tasks API', () => {
    const boardId = new ObjectId().toString()

    test('POST /boards/:boardId/tasks - success', async () => {
        const newTask = { title: 'New Task', description: 'Task Description' }

        const initialOrder = {
            ToDo: [new ObjectId().toString()],
            InProgress: [],
            Done: []
        }

        await boardsCollection.insertOne({
            _id: new ObjectId(boardId),
            name: 'Test Board',
            order: initialOrder
        })
        trackInsert(Entity.BOARDS, new ObjectId(boardId))

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('New Task')
        expect(response.body.description).toBe('Task Description')

        const taskInDb = await tasksCollection.findOne({ _id: new ObjectId(response.body._id) })
        expect(taskInDb?.title).toBe('New Task')
        expect(taskInDb?.description).toBe('Task Description')
        expect(taskInDb?.boardId).toBe(boardId)

        if (taskInDb?._id) {
            trackInsert(Entity.TASKS, taskInDb._id)
        }

        const boardInDb = await boardsCollection.findOne({ _id: new ObjectId(boardId) })

        expect(boardInDb?.order.ToDo[boardInDb?.order.ToDo.length - 1]).toBe(
            response.body._id.toString()
        )
    })

    test('POST /boards/:boardId/tasks - invalid data type', async () => {
        const newTask = { title: 123 } // Invalid data type for 'title' field

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - missing required field', async () => {
        const newTask = {} // Missing the required 'title' field

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - no extra fields', async () => {
        const newTask = { title: 'New Task', a: 1, b: 'abc' } // Extra fields

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test("POST /boards/:boardId/tasks - 'title' is empty", async () => {
        const newTask = { title: '', description: 'Task Description' }

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test("POST /boards/:boardId/tasks - 'title' too long", async () => {
        const newTask = { title: 'a'.repeat(101), description: 'Task Description' } // Title too long

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test("POST /boards/:boardId/tasks - 'description' too long", async () => {
        const newTask = { title: 'New Task', description: 'a'.repeat(201) } // Description too long

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - invalid boardId', async () => {
        const newTask = { title: 'New Task', description: 'Task Description' }
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).post(`/boards/${invalidBoardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - success', async () => {
        const taskId = new ObjectId()
        await tasksCollection.insertOne({
            _id: taskId,
            title: 'Initial Task',
            description: 'Initial Description',
            boardId
        })
        trackInsert(Entity.TASKS, taskId)

        const updatedTask = { title: 'Updated Task', description: 'Updated Description' }

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('Updated Task')
        expect(response.body.description).toBe('Updated Description')

        const taskInDb = await tasksCollection.findOne({ _id: taskId })
        expect(taskInDb?.title).toBe('Updated Task')
        expect(taskInDb?.description).toBe('Updated Description')
    })

    test('PUT /boards/:boardId/tasks/:id - missing all fields', async () => {
        const taskId = new ObjectId()
        const updatedBoard = {} // Missing all fields

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedBoard)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid data type', async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 123 } // Invalid data type for 'title' field

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test("PUT /boards/:boardId/tasks/:id - 'title' is empty", async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: '', description: 'Updated Description' }

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test("PUT /boards/:boardId/tasks/:id - 'title' too long", async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 'a'.repeat(101), description: 'Updated Description' } // Title too long

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test("PUT /boards/:boardId/tasks/:id - 'description' too long", async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 'Updated Task', description: 'a'.repeat(201) } // Description too long

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid boardId', async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 'Updated Task' }
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app)
            .put(`/boards/${invalidBoardId}/tasks/${taskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid id', async () => {
        const updatedTask = { title: 'Updated Task' }
        const invalidTaskId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app)
            .put(`/boards/${boardId}/tasks/${invalidTaskId}`)
            .send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - not found', async () => {
        const response = await request(app)
            .put(`/boards/${boardId}/tasks/60d21b4667d0d8992e610c85`)
            .send({ title: 'Updated Task' })

        expect(response.status).toBe(404)
    })

    test('DELETE /boards/:boardId/tasks/:id - success', async () => {
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
                title: 'Test Task',
                boardId: boardId.toString()
            })
        ]
        await Promise.all(promises)
        trackInsert(Entity.BOARDS, boardId)
        trackInsert(Entity.TASKS, taskId)

        const response = await request(app).delete(`/boards/${boardId}/tasks/${taskId}`)

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(taskId.toString())

        const taskInDb = await tasksCollection.findOne({ _id: taskId })
        expect(taskInDb).toBeNull()

        const boardInDb = await boardsCollection.findOne({ _id: boardId })
        expect(boardInDb?.order.ToDo).not.toContain(taskId.toString())
    })

    test('DELETE /boards/:boardId/tasks/:id - invalid boardId', async () => {
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format
        const taksId = new ObjectId().toString()

        const response = await request(app).delete(`/boards/${invalidBoardId}/tasks/${taksId}`)

        expect(response.status).toBe(400)
    })

    test('DELETE /boards/:boardId/tasks/:id - invalid id', async () => {
        const invalidTaskId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).delete(`/boards/${boardId}/tasks/${invalidTaskId}`)

        expect(response.status).toBe(400)
    })

    test('DELETE /boards/:boardId/tasks/:id - not found', async () => {
        const response = await request(app).delete(
            `/boards/${boardId}/tasks/60d21b4667d0d8992e610c85`
        )

        expect(response.status).toBe(404)
    })
})
