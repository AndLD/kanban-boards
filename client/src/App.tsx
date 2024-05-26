import { Content } from 'antd/es/layout/layout'
import Search from './components/Search'
import Columns from './components/Columns'

function App() {
    return (
        <Content style={{ padding: '0 18vw' }}>
            <Search />
            <Columns />
        </Content>
    )
}

export default App
