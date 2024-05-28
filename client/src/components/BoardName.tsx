import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { Button, Popconfirm, Tooltip } from 'antd'
import { boardsSlice } from '../store/boards.reducer'
import { useDeleteBoard } from '../hooks/store/boards.api'
import { successNotification } from '../utils/notifications'

export default function BoardName() {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)

    const deleteBoard = useDeleteBoard()

    return (
        <div style={{ fontSize: 30, fontWeight: 'bold' }}>
            {board.name}{' '}
            <Tooltip placement="top" title={board._id}>
                <Button
                    type="text"
                    style={{ width: 45, height: 45 }}
                    icon={<CopyOutlined style={{ fontSize: 25 }} />}
                    onClick={() => {
                        navigator.clipboard.writeText(board._id)
                        successNotification('ID copied')
                    }}
                />
            </Tooltip>
            <Button
                type="text"
                style={{ width: 45, height: 45 }}
                icon={<EditOutlined style={{ fontSize: 25 }} />}
                onClick={() => dispatch(boardsSlice.actions.setBoardToEdit(board))}
            />
            <Popconfirm
                title="Delete the board"
                description="Are you sure to delete this board?"
                onConfirm={() => deleteBoard(board._id)}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    type="text"
                    style={{ width: 45, height: 45 }}
                    icon={<DeleteOutlined style={{ fontSize: 25 }} />}
                />
            </Popconfirm>
        </div>
    )
}
