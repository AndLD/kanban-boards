import { Content } from 'antd/es/layout/layout'
import { useAppSelector } from './hooks/store'
import Header from './components/Header'
import LoadingScreen from './components/Board/LoadingScreen'
import BoardModal from './components/Modals/BoardModal'
import Board from './components/Board/Board'
import TaskModal from './components/Modals/TaskModal'
import BoardPlaceholder from './components/Board/BoardPlaceholder'

function App() {
    const { isLoading, board } = useAppSelector((state) => state.boardsReducer)

    return (
        <Content style={{ padding: '0 18vw' }}>
            <Header />
            {isLoading ? <LoadingScreen /> : board ? <Board /> : <BoardPlaceholder />}

            <BoardModal />
            <TaskModal />
        </Content>
    )
}

export default App
