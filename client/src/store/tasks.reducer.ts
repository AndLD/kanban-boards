import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITask } from '../utils/interfaces/tasks'

interface IState {
    tasks: ITask[]
    isModalVisible: boolean
    taskToEdit: ITask | null
}

const initialState: IState = {
    tasks: [],
    isModalVisible: false,
    taskToEdit: null
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload
        },
        setIsModalVisible(state, action: PayloadAction<boolean>) {
            state.isModalVisible = action.payload
            if (!action.payload) {
                state.taskToEdit = null
            }
        },
        setTaskToEdit(state, action: PayloadAction<ITask | null>) {
            state.taskToEdit = action.payload
            state.isModalVisible = true
        }
    }
})

export default tasksSlice.reducer
