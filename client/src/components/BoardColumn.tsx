import { ReactNode } from 'react'
import { Droppable } from 'react-beautiful-dnd'

export default function BoardColumn(props: { columnKey: string; title: string; children?: ReactNode | ReactNode[] }) {
    return (
        <div>
            <div
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 30,
                    padding: '15px 0'
                }}
            >
                {props.title}
            </div>
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
