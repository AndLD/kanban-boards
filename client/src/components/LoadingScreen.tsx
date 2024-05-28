import { LoadingOutlined } from '@ant-design/icons'

export default function LoadingScreen() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70vh'
            }}
        >
            <LoadingOutlined style={{ fontSize: 70 }} />
        </div>
    )
}
