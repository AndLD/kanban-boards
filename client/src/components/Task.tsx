import { Button } from 'antd'
import { ITask } from '../../../shared/interfaces/tasks'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function Task({ task }: { task: ITask }) {
    return (
        <div className="card">
            <div style={{ margin: 30 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {task.title.length > 25
                        ? task.title.slice(0, 25) + '...'
                        : task.title}
                </div>
                <div style={{ fontSize: 18, marginTop: 20 }}>
                    {task.description
                        ? task.description.length > 50
                            ? task.description.slice(0, 50) + '...'
                            : task.description
                        : ''}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        margin: 20
                    }}
                >
                    <Button
                        type="text"
                        style={{ width: 45, height: 45 }}
                        icon={<EditOutlined style={{ fontSize: 25 }} />}
                    />
                    <Button
                        type="text"
                        style={{ width: 45, height: 45 }}
                        icon={<DeleteOutlined style={{ fontSize: 25 }} />}
                    />
                </div>
            </div>
        </div>
    )
}
