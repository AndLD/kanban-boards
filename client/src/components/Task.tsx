import { ITask } from '../utils/interfaces/tasks'
import { Draggable } from 'react-beautiful-dnd'
import DeleteTaskBtn from './DeleteTaskBtn'
import EditTaskBtn from './EditTaskBtn'

export default function Task({ index, task }: { index: number; task: ITask }) {
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
                            <EditTaskBtn task={task} />
                            <DeleteTaskBtn taskId={task._id} />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
