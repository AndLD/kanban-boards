import { Button, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { boardsSlice } from '../store/boards.reducer'
import { useFetchBoard } from '../hooks/store/boards.api'
import { errorNotification } from '../utils/notifications'
import { useEffect } from 'react'

export default function Search() {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector((state) => state.boardsReducer.boardId)

    useEffect(() => {
        if (boardId) {
            onLoadClick()
        }
    }, [])

    useFetchBoard(boardId)

    const onLoadClick = () => {
        if (boardId) {
            const checkValidMongoDbId = new RegExp('^[0-9a-fA-F]{24}$')
            if (checkValidMongoDbId.test(boardId)) {
                dispatch(boardsSlice.actions.setSkipFetch(false))
            } else {
                errorNotification('Invalid ID')
            }
        }
    }

    const onNewClick = () => dispatch(boardsSlice.actions.setIsModalVisible(true))

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                height: '15vh'
            }}
        >
            <Input
                value={boardId}
                placeholder="Enter a board ID here..."
                style={{ paddingLeft: 20, fontSize: 20, height: 50 }}
                onChange={(event) => {
                    dispatch(boardsSlice.actions.setSkipFetch(true))
                    dispatch(boardsSlice.actions.setBoardId(event.target.value))
                }}
            />
            <Button style={{ width: 150, fontSize: 20, height: 50 }} onClick={onLoadClick}>
                Load
            </Button>
            <Button style={{ width: 150, fontSize: 20, height: 50 }} onClick={onNewClick}>
                New
            </Button>
        </div>
    )
}
