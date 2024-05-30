import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { boardsSlice } from '../store/boards.reducer'
import { IBoardPostBody, IBoardPutBody } from '../utils/interfaces/boards'
import { usePostBoard, usePutBoard } from '../hooks/store/boards.api'
import { successNotification } from '../utils/notifications'
import { adjustBody } from '../utils/utils'

export default function BoardModal() {
    const dispatch = useAppDispatch()
    const [form] = useForm()
    const { isModalVisible, boardToEdit } = useAppSelector((state) => state.boardsReducer)

    useEffect(() => {
        if (boardToEdit) {
            form.setFieldsValue(boardToEdit)
        }
    }, [boardToEdit])

    const postBoard = usePostBoard()
    const putBoard = usePutBoard(() => {
        successNotification('Board edited!')
    })

    const handleOk = () => {
        form.validateFields().then(async (data: IBoardPostBody | IBoardPutBody) => {
            const body = adjustBody<IBoardPostBody | IBoardPutBody>(data)

            form.resetFields()
            boardToEdit
                ? putBoard(boardToEdit._id, body as IBoardPutBody)
                : postBoard(body as IBoardPostBody)

            dispatch(boardsSlice.actions.setIsModalVisible(false))
        })
    }

    const handleCancel = () => {
        dispatch(boardsSlice.actions.setIsModalVisible(false))
        form.resetFields()
    }

    return (
        <Modal
            title={boardToEdit ? 'Edit Board' : 'Create new Board'}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
        >
            <Form form={form}>
                <Form.Item
                    style={{ width: '100%' }}
                    name="name"
                    rules={[
                        {
                            required: true,
                            whitespace: true
                        }
                    ]}
                >
                    <Input placeholder="Name" maxLength={100} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
