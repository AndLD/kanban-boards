import { useAppSelector } from '../hooks/store'
import CopyBoardIdBtn from './CopyBoardIdBtn'
import EditBoardBtn from './EditBoardBtn'
import DeleteBoardBtn from './DeleteBoardBtn'

export default function BoardName() {
    const board = useAppSelector((state) => state.boardsReducer.board)

    return (
        <div style={{ fontSize: 30, fontWeight: 'bold' }}>
            {board.name} <CopyBoardIdBtn />
            <EditBoardBtn />
            <DeleteBoardBtn />
        </div>
    )
}
