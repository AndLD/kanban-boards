import Title from 'antd/es/typography/Title'

interface IProps {
    title: string
}

export default function ColumnTitle({ title }: IProps) {
    return (
        <Title
            level={2}
            style={{
                textAlign: 'center',
                paddingBottom: '5px'
            }}
        >
            {title}
        </Title>
    )
}
