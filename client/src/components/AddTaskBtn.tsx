import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function AddTaskBtn() {
    return (
        <Button
            className="card"
            style={{
                width: '90%',
                background: 'rgba(255,255,255,.5)'
            }}
            icon={<PlusOutlined style={{ fontSize: 40 }} />}
        />
    )
}
