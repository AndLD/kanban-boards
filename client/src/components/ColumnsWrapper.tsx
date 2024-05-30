import { useAppDispatch, useAppSelector } from '../hooks/store'
import { DragDropContext } from 'react-beautiful-dnd'
import { boardsSlice } from '../store/boards.reducer'
import { useState } from 'react'
import { usePutBoard } from '../hooks/store/boards.api'
import Columns from './Columns'

export default function ColumnsWrapper() {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)

    const [isDragging, setIsDragging] = useState(false)

    const putBoard = usePutBoard()

    function onDragEnd(result) {
        const { source, destination, draggableId } = result

        setIsDragging(false)

        // If dropped outside the droppable area or the item is dropped in the same place, do nothing
        if (
            !destination ||
            (source.droppableId === destination.droppableId && source.index === destination.index)
        ) {
            return
        }

        const start = source.droppableId
        const finish = destination.droppableId

        const newBoard = { ...board }

        if (start === finish) {
            // Moving within the same column
            const newTaskIds = Array.from(board.order[start])
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            newBoard.order = {
                ...board.order,
                [start]: newTaskIds
            }
        } else {
            // Moving from one column to another
            const startTaskIds = Array.from(board.order[start])
            startTaskIds.splice(source.index, 1)

            const finishTaskIds = Array.from(board.order[finish])
            finishTaskIds.splice(destination.index, 0, draggableId)

            newBoard.order = {
                ...board.order,
                [start]: startTaskIds,
                [finish]: finishTaskIds
            }
        }

        dispatch(boardsSlice.actions.setBoard(newBoard))
        putBoard(board._id, {
            order: newBoard.order
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
            <Columns isDragging={isDragging} />
        </DragDropContext>
    )
}
