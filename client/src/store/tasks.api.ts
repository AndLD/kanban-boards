import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITaskDeleteResponse, ITaskPostBody, ITaskPutBody, ITask } from '../utils/interfaces/tasks'
import { API_URL, Entity } from '../utils/constants'

export const tasksApi = createApi({
    reducerPath: `${Entity.TASKS}/api`,
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        postTask: builder.mutation<ITask, { boardId: string; body: ITaskPostBody }>({
            query: ({ boardId, body }) => ({
                method: 'POST',
                url: `/api/boards/${boardId}/tasks`,
                body
            })
        }),
        putTask: builder.mutation<ITask, { boardId: string; id: string; body: ITaskPutBody }>({
            query: ({ boardId, id, body }) => ({
                method: 'PUT',
                url: `/api/boards/${boardId}/tasks/${id}`,
                body
            })
        }),
        deleteTask: builder.mutation<ITaskDeleteResponse, { boardId: string; id: string }>({
            query: ({ boardId, id }) => ({
                method: 'DELETE',
                url: `/api/boards/${boardId}/tasks/${id}`
            })
        })
    })
})

export const { usePostTaskMutation, usePutTaskMutation, useDeleteTaskMutation } = tasksApi
