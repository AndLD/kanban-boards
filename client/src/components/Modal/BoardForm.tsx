import { Form, FormInstance, Input } from 'antd'
import { IBoardPostBody } from '../../utils/interfaces/boards'

interface IProps {
    form: FormInstance<IBoardPostBody>
}

export default function BoardForm({ form }: IProps) {
    return (
        <Form form={form}>
            <Form.Item
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
    )
}
