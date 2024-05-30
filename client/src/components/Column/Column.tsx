import { ReactNode } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Tasks from '../Task/Tasks'
import ColumnTitle from './ColumnTitle'

export default function Column(props: {
    columnKey: string
    title: string
    children?: ReactNode | ReactNode[]
}) {
    return (
        <div>
            <ColumnTitle title={props.title} />
            <Droppable key={props.columnKey} droppableId={props.columnKey}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Tasks>
                            {props.children}
                            {provided.placeholder}
                        </Tasks>
                    </div>
                )}
            </Droppable>
        </div>
    )
}
