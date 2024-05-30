import SearchControls from './SearchControls'
import Search from './Search'

export default function SearchWrapper() {
    return (
        <div className="search-wrapper">
            <Search />
            <SearchControls />
        </div>
    )
}
