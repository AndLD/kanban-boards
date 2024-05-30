import { Form, FormInstance, Input } from 'antd'
import { ITaskPostBody } from '../../utils/interfaces/tasks'

interface IProps {
    form: FormInstance<ITaskPostBody>
}

export default function TaskForm({ form }: IProps) {
    return (
        <Form form={form}>
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
                    style={{ height: 100 }}
                    placeholder="Description"
                    showCount={true}
                    maxLength={200}
                />
            </Form.Item>
        </Form>
    )
}
