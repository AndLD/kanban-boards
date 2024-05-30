import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { tasksSlice } from '../../../store/tasks.reducer'
import { ITask } from '../../../utils/interfaces/tasks'
import { useAppDispatch } from '../../../hooks/store'

interface IProps {
    task: ITask
}

export default function EditTaskBtn({ task }: IProps) {
    const dispatch = useAppDispatch()

    return (
        <Button
            type="text"
            style={{ width: 45, height: 45 }}
            icon={<EditOutlined style={{ fontSize: 25 }} />}
            onClick={() => dispatch(tasksSlice.actions.setTaskToEdit(task))}
        />
    )
}
