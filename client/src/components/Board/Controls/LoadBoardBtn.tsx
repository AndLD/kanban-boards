import { Button } from 'antd'
import { boardsSlice } from '../../../store/boards.reducer'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { errorNotification } from '../../../utils/notifications'
import { useFetchBoard } from '../../../hooks/store/boards.api'

export default function LoadBoardBtn() {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector((state) => state.boardsReducer.boardId)

    useEffect(() => {
        // If boardId query param specified
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

    return (
        <Button style={{ width: 150, fontSize: 20, height: 50 }} onClick={onLoadClick}>
            Load
        </Button>
    )
}
