import { usePostTask, usePutTask } from '../../hooks/store/tasks.api'
import { successNotification } from '../../utils/notifications'
import Modal from './Modal'
import { Entity } from '../../utils/constants'

export default function TaskModal() {
    const postTask = usePostTask()
    const putTask = usePutTask(() => {
        successNotification('Task edited!')
    })

    return <Modal entity={Entity.TASKS} postMethod={postTask} putMethod={putTask} />
}
