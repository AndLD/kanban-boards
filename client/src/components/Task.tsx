import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ITask } from '../utils/interfaces/tasks'
import { useAppDispatch } from '../hooks/store'
import { tasksSlice } from '../store/tasks.reducer'
import { useDeleteTask } from '../hooks/store/tasks.api'
import { Draggable } from 'react-beautiful-dnd'

export default function Task({ index, task }: { index: number; task: ITask }) {
    const dispatch = useAppDispatch()

    const deleteTask = useDeleteTask()

    const title = task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title

    const description = task.description
        ? task.description.length > 50
            ? task.description.slice(0, 50) + '...'
            : task.description
        : ''

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card"
                >
                    <div style={{ margin: 30 }}>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</div>
                        <div style={{ fontSize: 18, marginTop: 20, height: 65 }}>{description}</div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'end'
                            }}
                        >
                            <Button
                                type="text"
                                style={{ width: 45, height: 45 }}
                                icon={<EditOutlined style={{ fontSize: 25 }} />}
                                onClick={() => dispatch(tasksSlice.actions.setTaskToEdit(task))}
                            />
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => deleteTask(task._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="text"
                                    style={{ width: 45, height: 45 }}
                                    icon={<DeleteOutlined style={{ fontSize: 25 }} />}
                                />
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
