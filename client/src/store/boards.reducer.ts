import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard } from '../utils/interfaces/boards'
import { ID } from '../utils/types'
import { Entity } from '../utils/constants'

interface IState {
    boardId: ID
    board: IBoard | null
    isLoading: boolean
    isModalVisible: boolean
    boardToEdit: IBoard | null
    skipFetch: boolean
}

const initialState: IState = {
    boardId: new URL(location.toString()).searchParams.get('boardId') || '',
    board: null,
    isLoading: false,
    isModalVisible: false,
    boardToEdit: null,
    skipFetch: true
}

export const boardsSlice = createSlice({
    name: Entity.BOARDS,
    initialState,
    reducers: {
        setBoardId(state, action: PayloadAction<ID | null>) {
            state.boardId = action.payload
        },
        setBoard(state, action: PayloadAction<IBoard | null>) {
            state.board = action.payload
            state.boardId = ''
            state.boardToEdit = null
            state.skipFetch = true
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setIsModalVisible(state, action: PayloadAction<boolean>) {
            state.isModalVisible = action.payload
            if (!action.payload) {
                state.boardToEdit = null
            }
        },
        setBoardToEdit(state, action: PayloadAction<IBoard | null>) {
            state.boardToEdit = action.payload
            state.isModalVisible = true
        },
        setSkipFetch(state, action: PayloadAction<boolean>) {
            state.skipFetch = action.payload
        }
    }
})

export default boardsSlice.reducer
