import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/index.scss'
import { setupStore } from './store/index.ts'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={setupStore()}>
        <App />
    </Provider>
)
