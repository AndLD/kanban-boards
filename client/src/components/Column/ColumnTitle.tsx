import Title from 'antd/es/typography/Title'

interface IProps {
    title: string
}

export default function ColumnTitle({ title }: IProps) {
    return (
        <Title className="column-title" level={2}>
            {title}
        </Title>
    )
}
