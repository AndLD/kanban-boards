import { Content } from 'antd/es/layout/layout'
import { useAppSelector } from './hooks/store'
import SearchWrapper from './components/SearchWrapper'
import LoadingScreen from './components/LoadingScreen'
import BoardModal from './components/BoardModal'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import BoardPlaceholder from './components/BoardPlaceholder'

function App() {
    const { isLoading, board } = useAppSelector((state) => state.boardsReducer)

    return (
        <Content style={{ padding: '0 18vw' }}>
            <SearchWrapper />
            {isLoading ? <LoadingScreen /> : board ? <Board /> : <BoardPlaceholder />}

            <BoardModal />
            <TaskModal />
        </Content>
    )
}

export default App
