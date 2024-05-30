import { boardsSlice } from '../../../store/boards.reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import Btn from '../../Btn'

export default function EditBoardBtn() {
    const dispatch = useAppDispatch()
    const board = useAppSelector((state) => state.boardsReducer.board)

    return <Btn type="edit" onClick={() => dispatch(boardsSlice.actions.setBoardToEdit(board))} />
}
