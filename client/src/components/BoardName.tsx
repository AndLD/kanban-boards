import { useAppSelector } from '../hooks/store'
import CopyBoardIdBtn from './CopyBoardIdBtn'
import EditBoardBtn from './EditBoardBtn'
import DeleteBoardBtn from './DeleteBoardBtn'
import Title from 'antd/es/typography/Title'

export default function BoardName() {
    const board = useAppSelector((state) => state.boardsReducer.board)

    return (
        <div style={{ display: 'flex' }}>
            <Title level={1}>{board.name}</Title> <CopyBoardIdBtn />
            <EditBoardBtn />
            <DeleteBoardBtn />
        </div>
    )
}
