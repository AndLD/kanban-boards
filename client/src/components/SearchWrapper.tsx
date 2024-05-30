import AddBoardBtn from './AddBoardBtn'
import LoadBoardBtn from './LoadBoardBtn'
import Search from './Search'

export default function SearchWrapper() {
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
            <Search />
            <LoadBoardBtn />
            <AddBoardBtn />
        </div>
    )
}
