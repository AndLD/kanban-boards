import { ITask } from '../../../utils/interfaces/tasks'
import DeleteTaskBtn from './DeleteTaskBtn'
import EditTaskBtn from './EditTaskBtn'

interface IProps {
    task: ITask
}

export default function TaskControls({ task }: IProps) {
    return (
        <div
            style={{
                textAlign: 'right'
            }}
        >
            <EditTaskBtn task={task} />
            <DeleteTaskBtn taskId={task._id} />
        </div>
    )
}
