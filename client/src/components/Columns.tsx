import AddTaskBtn from './AddTaskBtn'
import BoardColumn from './BoardColumn'
import Task from './Task'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { DragDropContext } from 'react-beautiful-dnd'
import { boardsSlice } from '../store/boards.reducer'
import { tasksSlice } from '../store/tasks.reducer'
import { useEffect, useState } from 'react'
import { ITask } from '../utils/interfaces/tasks'
import { ID } from '../utils/types'
import { usePutBoard } from '../hooks/store/boards.api'

export default function Columns() {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)
    const [tasksObject, setTasksObject] = useState<{ [id: ID]: ITask }>({})
    const [isDragging, setIsDragging] = useState(false)

    const putBoard = usePutBoard()

    useEffect(() => {
        const tasksObject = tasks.reduce((accum, item) => {
            accum[item._id] = item

            return accum
        }, {})

        setTasksObject(tasksObject)
    }, [tasks])

    function onDragEnd(result) {
        const { source, destination, draggableId } = result

        setIsDragging(false)

        // If the destination is null (e.g., dropped outside the droppable area), do nothing
        if (!destination) {
            return
        }

        // If the item is dropped in the same place, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        const start = source.droppableId
        const finish = destination.droppableId

        // Moving within the same column
        if (start === finish) {
            const newTaskIds = Array.from(board.order[start])
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newBoard = {
                ...board,
                order: {
                    ...board.order,
                    [start]: newTaskIds
                }
            }

            dispatch(boardsSlice.actions.setBoard(newBoard))
            putBoard(board._id, {
                order: newBoard.order
            })
        } else {
            // Moving from one column to another
            const startTaskIds = Array.from(board.order[start])
            startTaskIds.splice(source.index, 1)

            const finishTaskIds = Array.from(board.order[finish])
            finishTaskIds.splice(destination.index, 0, draggableId)

            const newBoard = {
                ...board,
                order: {
                    ...board.order,
                    [start]: startTaskIds,
                    [finish]: finishTaskIds
                }
            }

            const updatedTasks = tasks.map((task) =>
                task._id === draggableId ? { ...task, status: finish } : task
            )
            dispatch(tasksSlice.actions.setTasks(updatedTasks))

            dispatch(boardsSlice.actions.setBoard(newBoard))
            putBoard(board._id, {
                order: newBoard.order
            })
        }
    }

    const renderTasks = (columnKey: string) => {
        if (Object.keys(tasksObject).length === 0) {
            return
        }

        return board.order[columnKey].map(
            (taskId, i) =>
                tasksObject[taskId] && <Task key={taskId} index={i} task={tasksObject[taskId]} />
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <BoardColumn columnKey="ToDo" title="To Do">
                    {renderTasks('ToDo')}
                    {!isDragging && <AddTaskBtn />}
                </BoardColumn>
                <BoardColumn columnKey="InProgress" title="In Progress">
                    {renderTasks('InProgress')}
                </BoardColumn>
                <BoardColumn columnKey="Done" title="Done">
                    {renderTasks('Done')}
                </BoardColumn>
            </div>
        </DragDropContext>
    )
}
