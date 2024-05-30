import { Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { boardsSlice } from '../store/boards.reducer'

export default function Search() {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector((state) => state.boardsReducer.boardId)

    const onChange = (event) => {
        dispatch(boardsSlice.actions.setSkipFetch(true))
        dispatch(boardsSlice.actions.setBoardId(event.target.value))
    }

    return (
        <Input
            value={boardId}
            onChange={onChange}
            placeholder="Enter a board ID here..."
            style={{ paddingLeft: 20, fontSize: 20, height: 50 }}
        />
    )
}
