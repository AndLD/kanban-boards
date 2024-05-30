import { usePostBoard, usePutBoard } from '../hooks/store/boards.api'
import { successNotification } from '../utils/notifications'
import { Entity } from '../utils/constants'
import Modal from './Modal'

export default function TaskModal() {
    const postBoard = usePostBoard()
    const putBoard = usePutBoard(() => {
        successNotification('Board edited!')
    })

    return <Modal entity={Entity.BOARDS} postMethod={postBoard} putMethod={putBoard} />
}
