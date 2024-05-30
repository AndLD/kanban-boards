import CopyBoardIdBtn from './CopyBoardIdBtn'
import DeleteBoardBtn from './DeleteBoardBtn'
import EditBoardBtn from './EditBoardBtn'

export default function BoardControls() {
    return (
        <div>
            <CopyBoardIdBtn />
            <EditBoardBtn />
            <DeleteBoardBtn />
        </div>
    )
}
