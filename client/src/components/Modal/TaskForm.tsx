import { Form, FormInstance, Input } from 'antd'
import { ITaskPostBody } from '../../utils/interfaces/tasks'

interface IProps {
    form: FormInstance<ITaskPostBody>
}

export default function TaskForm({ form }: IProps) {
    return (
        <Form form={form}>
            <Form.Item
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
                <Input.TextArea placeholder="Description" showCount={true} maxLength={200} />
            </Form.Item>
        </Form>
    )
}
