import { Button } from 'antd'
import { boardsSlice } from '../store/boards.reducer'
import { useAppDispatch } from '../hooks/store'

export default function AddBoardBtn() {
    const dispatch = useAppDispatch()
    const onNewClick = () => dispatch(boardsSlice.actions.setIsModalVisible(true))

    return (
        <Button style={{ width: 150, fontSize: 20, height: 50 }} onClick={onNewClick}>
            New
        </Button>
    )
}
