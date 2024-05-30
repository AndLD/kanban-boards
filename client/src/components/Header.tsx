import HeaderBoardControls from './Board/Controls/HeaderBoardControls'
import Search from './Search'

export default function Header() {
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
            <HeaderBoardControls />
        </div>
    )
}
