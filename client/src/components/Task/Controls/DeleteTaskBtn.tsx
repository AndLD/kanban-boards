import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { ID } from '../../../utils/types'
import { useDeleteTask } from '../../../hooks/store/tasks.api'
import Btn from '../../Btn'

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
            <Btn type="delete" />
        </Popconfirm>
    )
}
