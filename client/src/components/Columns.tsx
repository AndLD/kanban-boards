import AddTaskBtn from './AddTaskBtn'
import BoardColumn from './BoardColumn'
import Task from './Task'
import { useAppSelector } from '../hooks/store'
import TaskModal from './TaskModal'

export default function Columns() {
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    const tasksByStatus = {
        ToDo: [],
        InProgress: [],
        Done: []
    }

    tasks.forEach((task) =>
        tasksByStatus[task.status].push(<Task key={task._id} task={task} />)
    )

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <BoardColumn title="To Do">
                {tasksByStatus.ToDo}
                <AddTaskBtn />
            </BoardColumn>
            <BoardColumn title="In Progress">
                {tasksByStatus.InProgress}
            </BoardColumn>
            <BoardColumn title="Done">{tasksByStatus.Done}</BoardColumn>
            <TaskModal />
        </div>
    )
}
