import { useEffect, useState } from 'react'
import BoardColumn from './BoardColumn'
import { ID } from '../utils/types'
import { ITask } from '../utils/interfaces/tasks'
import Task from './Task'
import AddTaskBtn from './AddTaskBtn'
import { ColumnTitle } from '../utils/constants'
import { useAppSelector } from '../hooks/store'

interface IProps {
    isDragging: boolean
}

export default function Columns({ isDragging }: IProps) {
    const [tasksMapped, setTasksMapped] = useState<{ [id: ID]: ITask }>({})
    const board = useAppSelector((state) => state.boardsReducer.board)
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    useEffect(() => {
        if (!tasks) {
            return
        }

        const tasksMapped = tasks.reduce((accum, item) => {
            accum[item._id] = item

            return accum
        }, {})

        setTasksMapped(tasksMapped)
    }, [tasks])

    const renderTasks = (columnKey: string) => {
        if (Object.keys(tasksMapped).length === 0) {
            return
        }

        return board.order[columnKey].map(
            (taskId, i) =>
                tasksMapped[taskId] && <Task key={taskId} index={i} task={tasksMapped[taskId]} />
        )
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            {board &&
                Object.keys(board.order).map((key, i) => (
                    <BoardColumn key={key} columnKey={key} title={ColumnTitle[key]}>
                        {renderTasks(key)}
                        {!isDragging && key === 'ToDo' && <AddTaskBtn />}
                    </BoardColumn>
                ))}
        </div>
    )
}
