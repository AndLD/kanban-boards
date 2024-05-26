import { ID } from '../../../shared/types'
import { useEffect, useState } from 'react'
import AddTaskBtn from './AddTaskBtn'
import BoardColumn from './BoardColumn'
import Task from './Task'

export default function Columns() {
    const [boardId, setBoardId] = useState<ID | null>(null)

    useEffect(() => {
        const boardId = new URL(location.toString()).searchParams.get('boardId')

        if (boardId) {
            setBoardId(boardId)
        }
    }, [])

    // fetch board with tasks here

    useEffect(() => {
        if (boardId) {
            // launch fetch
        }
    }, [boardId])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <BoardColumn title="To Do">
                <Task
                    task={{
                        _id: 'dghghfhsyvetjg',
                        title: 'My super long title wow yep Very long task name',
                        description:
                            'Test big description, task definition, hard, very hard task than. What nice pamphlet here I can see.',
                        createdAt: 3553462341356,
                        status: 'ToDo'
                    }}
                />
                <AddTaskBtn />
            </BoardColumn>
            <BoardColumn title="In Progress"></BoardColumn>
            <BoardColumn title="Done"></BoardColumn>
        </div>
    )
}
