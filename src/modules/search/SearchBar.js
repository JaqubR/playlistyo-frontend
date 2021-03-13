import './SearchBar.css';
import { useState, createState } from '@hookstate/core';
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";

const searchTerm = createState('');

function SearchBar() {

    const currentSearchTerm = useState(searchTerm);

    return (
        <div className="search-bar-wrapper">
            <input
                type="text"
                value={currentSearchTerm.get()}
                onChange={e => currentSearchTerm.set(e.target.value)}
                className="search-bar"
                placeholder="Search"
            />
            <IconContext.Provider value={{className: "search-bar-icon"}}>
                <IoSearch />
            </IconContext.Provider>
        </div>
    )
}

export default SearchBar;