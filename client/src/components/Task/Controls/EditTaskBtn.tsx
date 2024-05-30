import { tasksSlice } from '../../../store/tasks.reducer'
import { ITask } from '../../../utils/interfaces/tasks'
import { useAppDispatch } from '../../../hooks/store'
import Btn from '../../Btn'

interface IProps {
    task: ITask
}

export default function EditTaskBtn({ task }: IProps) {
    const dispatch = useAppDispatch()

    return <Btn type="edit" onClick={() => dispatch(tasksSlice.actions.setTaskToEdit(task))} />
}
