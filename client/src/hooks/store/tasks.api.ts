import {
    useDeleteTaskMutation,
    usePostTaskMutation,
    usePutTaskMutation
} from '../../store/tasks.api'
import { ITaskPostBody, ITaskPutBody } from '../../utils/interfaces/tasks'
import { errorNotification, handleError } from '../../utils/notifications'
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
                            ToDo: [...board.order.ToDo, task._id]
                        }
                    })
                )

                callback && callback(task._id)
            } else {
                handleError(value.error, 'Post task request failed')
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
        }).then((value) => {
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
                handleError(value.error, 'Edit task request failed')
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
                handleError(value.error, 'Delete task request failed')
            }
        })
    }
}
