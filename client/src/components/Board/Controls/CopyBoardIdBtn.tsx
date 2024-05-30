import { Button, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../hooks/store'
import { successNotification } from '../../../utils/notifications'

export default function CopyBoardIdBtn() {
    const boardId = useAppSelector((state) => state.boardsReducer.board._id)

    return (
        <Tooltip placement="top" title={boardId}>
            <Button
                type="text"
                style={{ width: 45, height: 45 }}
                icon={<CopyOutlined style={{ fontSize: 25 }} />}
                onClick={() => {
                    navigator.clipboard.writeText(boardId)
                    successNotification('ID copied')
                }}
            />
        </Tooltip>
    )
}
