import './SearchBar.css';
import { useState } from '@hookstate/core';
import { searchTermState } from "../../GlobalStates";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";
import Field from "../controls/Field";

function SearchBar() {

    const searchTerm = useState(searchTermState);

    return (
        <div className="search-bar-wrapper">
            <Field type="text" value={searchTerm} placeholder="Search" />
            <IconContext.Provider value={{className: "search-bar-icon"}}>
                <IoSearch />
            </IconContext.Provider>
        </div>
    )
}

export default SearchBar;