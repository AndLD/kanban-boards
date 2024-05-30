import { Content } from 'antd/es/layout/layout'
import { useAppSelector } from './hooks/store'
import SearchWrapper from './components/Search/SearchWrapper'
import LoadingScreen from './components/Board/LoadingScreen'
import BoardModal from './components/Modal/BoardModal'
import Board from './components/Board/Board'
import TaskModal from './components/Modal/TaskModal'
import BoardPlaceholder from './components/Board/BoardPlaceholder'

function App() {
    const { isLoading, board } = useAppSelector((state) => state.boardsReducer)

    return (
        <Content className="wrapper">
            <SearchWrapper />
            {isLoading ? <LoadingScreen /> : board ? <Board /> : <BoardPlaceholder />}
            <BoardModal />
            <TaskModal />
        </Content>
    )
}

export default App
