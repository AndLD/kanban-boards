import {
    useDeleteTaskMutation,
    usePostTaskMutation,
    usePutTaskMutation
} from '../../store/tasks.api'
import { ITaskPostBody, ITaskPutBody } from '../../utils/interfaces/tasks'
import { errorNotification } from '../../utils/notifications'
import { tasksSlice } from '../../store/tasks.reducer'
import { useAppDispatch, useAppSelector } from '.'
import { boardsSlice } from '../../store/boards.reducer'

export function usePostTask(callback?: (newTaskId: string) => void) {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    const [postTaskMutation] = usePostTaskMutation()

    return (body: ITaskPostBody) => {
        postTaskMutation({
            boardId: board._id,
            body
        }).then((value) => {
            if (value.data) {
                const task = value.data
                dispatch(tasksSlice.actions.setTasks([...tasks, task]))
                dispatch(
                    boardsSlice.actions.setBoard({
                        ...board,
                        order: {
                            ...board.order,
                            [task.status]: [...board.order[task.status], task._id]
                        }
                    })
                )

                callback && callback(task._id)
            } else {
                const error = (value.error as any)?.msg || (value.error as any)?.data?.error
                errorNotification(error, 'Post task request failed')
            }
        })
    }
}

export function usePutTask(callback?: () => void) {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector((state) => state.boardsReducer.board?._id)
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    const [putTaskMutation] = usePutTaskMutation()

    return (id: string, body: ITaskPutBody) => {
        putTaskMutation({
            boardId,
            id,
            body
        }).then((value: any) => {
            if (value.data) {
                dispatch(
                    tasksSlice.actions.setTasks(
                        tasks.map((task) => {
                            if (task._id === id) {
                                return value.data
                            }

                            return task
                        })
                    )
                )

                callback && callback()
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Edit task request failed')
            }
        })
    }
}

export function useDeleteTask() {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector((state) => state.boardsReducer.board?._id)
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    const [deleteTaskMutation] = useDeleteTaskMutation()

    return (id: string) => {
        deleteTaskMutation({
            boardId,
            id
        }).then((value) => {
            if (value.data) {
                dispatch(tasksSlice.actions.setTasks(tasks.filter((task) => task._id !== id)))
            } else {
                const error = (value.error as any)?.msg || (value.error as any)?.data?.error
                errorNotification(error, 'Delete task request failed')
            }
        })
    }
}
