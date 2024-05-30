import { useAppSelector } from '../hooks/store'
import Title from 'antd/es/typography/Title'
import BoardControls from './BoardControls'

export default function BoardName() {
    const board = useAppSelector((state) => state.boardsReducer.board)

    return (
        <div style={{ display: 'flex' }}>
            <Title level={1}>{board.name}</Title>
            <BoardControls />
        </div>
    )
}
