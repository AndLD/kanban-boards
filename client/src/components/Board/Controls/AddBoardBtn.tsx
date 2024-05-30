import { Button } from 'antd'
import { boardsSlice } from '../../../store/boards.reducer'
import { useAppDispatch } from '../../../hooks/store'

export default function AddBoardBtn() {
    const dispatch = useAppDispatch()
    const onNewClick = () => dispatch(boardsSlice.actions.setIsModalVisible(true))

    return (
        <Button className="search-btn" onClick={onNewClick}>
            New
        </Button>
    )
}
