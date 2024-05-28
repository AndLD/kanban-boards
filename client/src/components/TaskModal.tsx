import { useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { tasksSlice } from '../store/tasks.reducer'
import { ITaskPostBody } from '../utils/interfaces/tasks'
import { usePostTask, usePutTask } from '../hooks/store/tasks.api'
import { successNotification } from '../utils/notifications'

export default function TaskModal() {
    const dispatch = useAppDispatch()
    const [form] = useForm()
    const { isModalVisible, taskToEdit } = useAppSelector((state) => state.tasksReducer)

    useEffect(() => {
        form.setFieldsValue(taskToEdit)
    }, [taskToEdit])

    const postTask = usePostTask()
    const putTask = usePutTask(() => {
        successNotification('Task edited!')
    })

    const handleOk = () => {
        form.validateFields().then(async (data: ITaskPostBody) => {
            const body: any = {}

            Object.keys(data).forEach((key) => {
                if (data[key] !== undefined && key !== '_id') {
                    body[key] = data[key]
                }
            })

            form.resetFields()
            taskToEdit ? putTask(taskToEdit._id, body) : postTask(body)
        })

        dispatch(tasksSlice.actions.setIsModalVisible(false))
    }

    const handleCancel = () => {
        dispatch(tasksSlice.actions.setIsModalVisible(false))
        form.resetFields()
    }

    return (
        <Modal
            title={taskToEdit ? 'Edit Task' : 'Create new Task'}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
        >
            <Form
                form={form}
                initialValues={{
                    status: 'ToDo'
                }}
            >
                <Form.Item
                    style={{ width: '100%' }}
                    name="title"
                    rules={[
                        {
                            required: true,
                            whitespace: true
                        }
                    ]}
                >
                    <Input placeholder="Title" maxLength={100} />
                </Form.Item>
                <Form.Item name="description">
                    <Input.TextArea
                        showCount={true}
                        placeholder="Description"
                        style={{ height: 100 }}
                        maxLength={200}
                    />
                </Form.Item>
                <Form.Item name="status" style={{ display: taskToEdit ? 'block' : 'none' }}>
                    <Select
                        disabled={!taskToEdit}
                        placeholder="Status"
                        style={{
                            width: 120
                        }}
                        options={[
                            { value: 'ToDo', label: 'To Do' },
                            { value: 'InProgress', label: 'In Progress' },
                            { value: 'Done', label: 'Done' }
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
