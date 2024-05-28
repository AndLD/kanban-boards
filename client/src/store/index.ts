import { combineReducers, configureStore } from '@reduxjs/toolkit'
import boardsReducer from './boards.reducer'
import tasksReducer from './tasks.reducer'
import { boardsApi } from './boards.api'
import { tasksApi } from './tasks.api'

const rootReducer = combineReducers({
    boardsReducer,
    tasksReducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                boardsApi.middleware,
                tasksApi.middleware
            )
        }
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
