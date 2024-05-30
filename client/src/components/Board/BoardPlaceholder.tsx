import { Empty } from 'antd'

export default function BoardPlaceholder() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70vh'
            }}
        >
            <Empty style={{ fontSize: 20 }} description="Type ID to view your board" />
        </div>
    )
}
