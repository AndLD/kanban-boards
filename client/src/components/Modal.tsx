import React, { useEffect } from 'react'
import { Modal as AntdModal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { tasksSlice } from '../store/tasks.reducer'
import { adjustBody } from '../utils/utils'
import { Entity } from '../utils/constants'
import { boardsSlice } from '../store/boards.reducer'
import { ID } from '../utils/types'
import BoardForm from './BoardForm'
import TaskForm from './TaskForm'

interface IProps<PostBody, PutBody> {
    entity: Entity
    postMethod: (body: PostBody) => void
    putMethod: (id: ID, body: PutBody) => void
}

export default function Modal<PostBody, PutBody>({
    entity,
    postMethod,
    putMethod
}: IProps<PostBody, PutBody>) {
    const dispatch = useAppDispatch()
    const [form] = useForm()
    const isModalVisible = useAppSelector((state) => state[`${entity}Reducer`].isModalVisible)
    const itemToEdit = useAppSelector(
        (state) => state[`${entity}Reducer`][`${entity.substring(0, entity.length - 1)}ToEdit`]
    )

    useEffect(() => {
        form.setFieldsValue(itemToEdit)
    }, [itemToEdit])

    const handleOk = () => {
        form.validateFields().then(async (data: PostBody | PutBody) => {
            const body = adjustBody<PostBody | PutBody>(data)

            form.resetFields()
            itemToEdit ? putMethod(itemToEdit._id, body as PutBody) : postMethod(body as PostBody)

            const slice = entity === Entity.BOARDS ? boardsSlice : tasksSlice
            dispatch(slice.actions.setIsModalVisible(false))
        })
    }

    const handleCancel = () => {
        const slice = entity === Entity.BOARDS ? boardsSlice : tasksSlice
        dispatch(slice.actions.setIsModalVisible(false))
        form.resetFields()
    }

    const name = entity[0].toUpperCase() + entity.substring(1, entity.length - 1)
    const title = itemToEdit ? `Edit ${name}` : `Create new ${name}`

    return (
        <AntdModal
            title={title}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
        >
            {entity === Entity.BOARDS ? <BoardForm form={form} /> : <TaskForm form={form} />}
        </AntdModal>
    )
}
