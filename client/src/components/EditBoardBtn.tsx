import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { boardsSlice } from '../store/boards.reducer'
import { useAppDispatch, useAppSelector } from '../hooks/store'

export default function EditBoardBtn() {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)

    return (
        <Button
            type="text"
            style={{ width: 45, height: 45 }}
            icon={<EditOutlined style={{ fontSize: 25 }} />}
            onClick={() => dispatch(boardsSlice.actions.setBoardToEdit(board))}
        />
    )
}
