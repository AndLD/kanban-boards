import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useAppDispatch } from '../../../hooks/store'
import { tasksSlice } from '../../../store/tasks.reducer'

export default function AddTaskBtn() {
    const dispatch = useAppDispatch()

    return (
        <Button
            className="task-card"
            icon={<PlusOutlined style={{ fontSize: 40 }} />}
            style={{
                width: '90%',
                background: 'rgba(255,255,255,.5)'
            }}
            onClick={() => dispatch(tasksSlice.actions.setIsModalVisible(true))}
        />
    )
}
