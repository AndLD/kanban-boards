import { ITask } from '../../utils/interfaces/tasks'
import { Draggable } from 'react-beautiful-dnd'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import TaskControls from './Controls/TaskControls'

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
                        <Title level={4} style={{ fontWeight: 'bold' }}>
                            {title}
                        </Title>
                        <Paragraph style={{ fontSize: 16, height: 50 }}>{description}</Paragraph>
                        <TaskControls task={task} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}
