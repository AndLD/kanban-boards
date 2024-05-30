import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IBoardDeleteResponse,
    IBoardPostBody,
    IBoardPutBody,
    IBoard,
    IFetchBoardResponse
} from '../utils/interfaces/boards'
import { API_URL, Entity } from '../utils/constants'

export const boardsApi = createApi({
    reducerPath: `${Entity.BOARDS}/api`,
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        fetchBoard: builder.query<IFetchBoardResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/api/boards/${id}`
            })
        }),
        postBoard: builder.mutation<IBoard, { body: IBoardPostBody }>({
            query: ({ body }) => ({
                method: 'POST',
                url: '/api/boards',
                body
            })
        }),
        putBoard: builder.mutation<IBoard, { id: string; body: IBoardPutBody }>({
            query: ({ id, body }) => ({
                method: 'PUT',
                url: `/api/boards/${id}`,
                body
            })
        }),
        deleteBoard: builder.mutation<IBoardDeleteResponse, { id: string }>({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/api/boards/${id}`
            })
        })
    })
})

export const {
    useFetchBoardQuery,
    usePostBoardMutation,
    usePutBoardMutation,
    useDeleteBoardMutation
} = boardsApi
