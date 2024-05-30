import { Empty } from 'antd'

export default function BoardPlaceholder() {
    return (
        <div className="board-placeholder">
            <Empty style={{ fontSize: 20 }} description="Type ID to view your board" />
        </div>
    )
}
