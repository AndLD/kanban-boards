import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { useAppSelector } from '../../../hooks/store'
import { useDeleteBoard } from '../../../hooks/store/boards.api'

export default function DeleteBoardBtn() {
    const boardId = useAppSelector((state) => state.boardsReducer.board._id)
    const deleteBoard = useDeleteBoard()

    return (
        <Popconfirm
            title="Delete the board"
            description="Are you sure to delete this board?"
            onConfirm={() => deleteBoard(boardId)}
            okText="Yes"
            cancelText="No"
        >
            <Button
                type="text"
                style={{ width: 45, height: 45 }}
                icon={<DeleteOutlined style={{ fontSize: 25 }} />}
            />
        </Popconfirm>
    )
}
