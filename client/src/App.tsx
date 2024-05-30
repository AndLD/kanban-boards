import { Content } from 'antd/es/layout/layout'
import { Empty } from 'antd'
import { useAppSelector } from './hooks/store'
import Search from './components/Search'
import LoadingScreen from './components/LoadingScreen'
import BoardModal from './components/BoardModal'
import Board from './components/Board'
import TaskModal from './components/TaskModal'

function App() {
    const { isLoading, board } = useAppSelector((state) => state.boardsReducer)

    return (
        <Content style={{ padding: '0 18vw' }}>
            <Search />
            {isLoading ? (
                <LoadingScreen />
            ) : board ? (
                <Board />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh'
                    }}
                >
                    <Empty style={{ fontSize: 20 }} description="Type ID to view your board" />
                </div>
            )}

            <BoardModal />
            <TaskModal />
        </Content>
    )
}

export default App
