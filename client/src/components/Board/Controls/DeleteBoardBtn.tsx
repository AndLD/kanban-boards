import { Popconfirm } from 'antd'
import { useAppSelector } from '../../../hooks/store'
import { useDeleteBoard } from '../../../hooks/store/boards.api'
import Btn from '../../Btn'

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
            <Btn type="delete" />
        </Popconfirm>
    )
}
