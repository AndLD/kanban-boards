import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import request from 'supertest'
import express from 'express'
import { tasksRouter } from '../routers/tasks'
import { clearInsertedDocs, trackInsert } from './dbHelpers'
import { ObjectId } from 'mongodb'
import { db, dbService } from '../services/db'

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
        const newTask = { title: 'New Task', status: 'ToDo' }

        const response = await request(app).post(`/boards/${boardId}/tasks`).send(newTask)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('New Task')
        expect(response.body.status).toBe('ToDo')

        const taskInDb = await db.collection('tasks').findOne({ _id: new ObjectId(response.body._id) })
        expect(taskInDb?.title).toBe('New Task')
        expect(taskInDb?.status).toBe('ToDo')
        if (taskInDb?._id) {
            trackInsert('tasks', taskInDb._id)
        }
    })

    test('POST /boards/:boardId/tasks - missing required field', async () => {
        const newTask = {} // Missing the required 'title' field

        const response = await request(app).post('/boards/60d21b4667d0d8992e610c85/tasks').send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - invalid data type', async () => {
        const newTask = { title: 123 } // Invalid data type for 'title' field

        const response = await request(app).post('/boards/60d21b4667d0d8992e610c85/tasks').send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - invalid status value', async () => {
        const newTask = { title: 'New Task', status: 'InvalidStatus' } // Invalid value for 'status' field

        const response = await request(app).post('/boards/60d21b4667d0d8992e610c85/tasks').send(newTask)

        expect(response.status).toBe(400)
    })

    test('POST /boards/:boardId/tasks - invalid boardId', async () => {
        const newTask = { title: 'New Task', status: 'ToDo' }
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).post(`/boards/${invalidBoardId}/tasks`).send(newTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - success', async () => {
        const tasksCollection = db.collection('tasks')
        const taskId = new ObjectId()
        await tasksCollection.insertOne({ _id: taskId, title: 'Initial Task', status: 'ToDo', boardId })
        trackInsert('tasks', taskId)

        const updatedTask = { title: 'Updated Task', status: 'InProgress' }

        const response = await request(app).put(`/boards/${boardId}/tasks/${taskId}`).send(updatedTask)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('Updated Task')
        expect(response.body.status).toBe('InProgress')

        const taskInDb = await tasksCollection.findOne({ _id: taskId })
        expect(taskInDb?.title).toBe('Updated Task')
        expect(taskInDb?.status).toBe('InProgress')
    })

    test('PUT /boards/:boardId/tasks/:id - invalid data type', async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 123 } // Invalid data type for 'title' field

        const response = await request(app).put(`/boards/60d21b4667d0d8992e610c85/tasks/${taskId}`).send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid status value', async () => {
        const taskId = new ObjectId()
        const updatedTask = { status: 'InvalidStatus' } // Invalid value for 'status' field

        const response = await request(app).put(`/boards/60d21b4667d0d8992e610c85/tasks/${taskId}`).send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - not found', async () => {
        const response = await request(app)
            .put(`/boards/${boardId}/tasks/60d21b4667d0d8992e610c85`)
            .send({ title: 'Updated Task' })

        expect(response.status).toBe(404)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid boardId', async () => {
        const taskId = new ObjectId()
        const updatedTask = { title: 'Updated Task' }
        const invalidBoardId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).put(`/boards/${invalidBoardId}/tasks/${taskId}`).send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('PUT /boards/:boardId/tasks/:id - invalid id', async () => {
        const boardId = new ObjectId()
        const updatedTask = { title: 'Updated Task' }
        const invalidTaskId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).put(`/boards/${boardId}/tasks/${invalidTaskId}`).send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('DELETE /boards/:boardId/tasks/:id - success', async () => {
        const tasksCollection = db.collection('tasks')
        const taskId = new ObjectId()
        await tasksCollection.insertOne({ _id: taskId, title: 'Test Task', status: 'ToDo', boardId })
        trackInsert('tasks', taskId)

        const response = await request(app).delete(`/boards/${boardId}/tasks/${taskId}`)

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(taskId.toString())

        const taskInDb = await tasksCollection.findOne({ _id: taskId })
        expect(taskInDb).toBeNull()
    })

    test('DELETE /boards/:boardId/tasks/:id - invalid id', async () => {
        const boardId = new ObjectId()
        const updatedTask = { title: 'Updated Task' }
        const invalidTaskId = 'invalidObjectId' // Invalid ObjectId format

        const response = await request(app).delete(`/boards/${boardId}/tasks/${invalidTaskId}`).send(updatedTask)

        expect(response.status).toBe(400)
    })

    test('DELETE /boards/:boardId/tasks/:id - not found', async () => {
        const response = await request(app).delete(`/boards/${boardId}/tasks/60d21b4667d0d8992e610c85`)

        expect(response.status).toBe(404)
    })
})
