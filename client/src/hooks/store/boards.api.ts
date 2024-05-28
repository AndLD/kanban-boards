import { useEffect } from 'react'
import {
    useDeleteBoardMutation,
    useFetchBoardQuery,
    usePostBoardMutation,
    usePutBoardMutation
} from '../../store/boards.api'
import { IBoardPostBody, IBoardPutBody, IFetchBoardResponse } from '../../utils/interfaces/boards'
import { errorNotification } from '../../utils/notifications'
import { boardsSlice } from '../../store/boards.reducer'
import { useAppDispatch, useAppSelector } from '.'
import { tasksSlice } from '../../store/tasks.reducer'

export function useFetchBoard(id: string | null) {
    const dispatch = useAppDispatch()
    const skip = useAppSelector((state) => state.boardsReducer.skipFetch)

    const fetchBoardQuery = useFetchBoardQuery({ id }, { skip })

    useEffect(() => {
        dispatch(boardsSlice.actions.setIsLoading(fetchBoardQuery?.isLoading))
    }, [fetchBoardQuery?.isLoading])

    useEffect(() => {
        if (fetchBoardQuery?.data) {
            const { board, tasks } = fetchBoardQuery.data as IFetchBoardResponse

            dispatch(boardsSlice.actions.setBoard(board))
            dispatch(tasksSlice.actions.setTasks(tasks))
        }
    }, [fetchBoardQuery?.data])

    useEffect(() => {
        const errorStatus = (fetchBoardQuery?.error as any)?.originalStatus
        if (errorStatus) {
            errorNotification(errorStatus === 404 ? '404 Board not found' : 'Error fetching board')
        }
    }, [fetchBoardQuery?.error])

    return fetchBoardQuery.refetch
}

export function usePostBoard(callback?: (newBoardId: string) => void) {
    const dispatch = useAppDispatch()

    const [postBoardMutation] = usePostBoardMutation()

    return (body: IBoardPostBody) => {
        postBoardMutation({
            body
        }).then((value: any) => {
            if (value.data) {
                const board = value?.data
                dispatch(boardsSlice.actions.setBoard(board))

                callback && callback(board._id)
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Post board request failed')
            }
        })
    }
}

export function usePutBoard(callback?: () => void) {
    const dispatch = useAppDispatch()

    const [putBoardMutation] = usePutBoardMutation()

    return (id: string, body: IBoardPutBody) => {
        putBoardMutation({
            id,
            body
        }).then((value: any) => {
            if (value.data) {
                dispatch(boardsSlice.actions.setBoard(value.data))

                callback && callback()
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Edit board request failed')
            }
        })
    }
}

export function useDeleteBoard() {
    const dispatch = useAppDispatch()

    const [deleteBoardMutation] = useDeleteBoardMutation()

    return (id: string) => {
        deleteBoardMutation({
            id
        }).then((value: any) => {
            if (value.data) {
                dispatch(boardsSlice.actions.setBoard(null))
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Delete board request failed')
            }
        })
    }
}
