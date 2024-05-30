import { Tooltip } from 'antd'
import { useAppSelector } from '../../../hooks/store'
import { successNotification } from '../../../utils/notifications'
import { copyToClipboard } from '../../../utils/utils'
import Btn from '../../Btn'

export default function CopyBoardIdBtn() {
    const boardId = useAppSelector((state) => state.boardsReducer.board._id)

    return (
        <Tooltip placement="top" title={boardId}>
            <Btn
                type="copy"
                onClick={() => {
                    copyToClipboard(boardId)
                    successNotification('ID copied')
                }}
            />
        </Tooltip>
    )
}
