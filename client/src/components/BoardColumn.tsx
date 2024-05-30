import Title from 'antd/es/typography/Title'
import { ReactNode } from 'react'
import { Droppable } from 'react-beautiful-dnd'

export default function BoardColumn(props: {
    columnKey: string
    title: string
    children?: ReactNode | ReactNode[]
}) {
    return (
        <div>
            <Title
                level={2}
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingTop: '5px'
                }}
            >
                {props.title}
            </Title>
            <Droppable key={props.columnKey} droppableId={props.columnKey}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div
                            style={{
                                minHeight: '65vh',
                                maxHeight: '65vh',
                                width: '20vw',
                                background: 'lightgray',
                                overflowY: 'scroll'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    marginBottom: 20
                                }}
                            >
                                {props.children}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    )
}
