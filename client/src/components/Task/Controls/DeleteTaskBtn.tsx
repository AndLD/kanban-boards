import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { ID } from '../../../utils/types'
import { useDeleteTask } from '../../../hooks/store/tasks.api'

interface IProps {
    taskId: ID
}

export default function DeleteTaskBtn({ taskId }: IProps) {
    const deleteTask = useDeleteTask()

    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => deleteTask(taskId)}
            okText="Yes"
            cancelText="No"
        >
            <Button
                type="text"
                style={{ width: 45, height: 45 }}
                icon={<DeleteOutlined style={{ fontSize: 25 }} />}
            />
        </Popconfirm>
    )
}
