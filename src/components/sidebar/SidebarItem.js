import './SidebarItem.css';
import { IconContext } from "react-icons";
import { IoHeart, IoSearch, IoMusicalNotes } from "react-icons/io5";
import { currentSectionState } from "../../GlobalStates";
import { useState } from '@hookstate/core';

const icons = {
    Favourites: <IoHeart />,
    Search: <IoSearch />,
    Playlist: <IoMusicalNotes />
}

function SidebarItem({ name }) {

    const currentSection = useState(currentSectionState);

    return (
        <div
            className={currentSection.get() === name ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => currentSection.set(name)}
        >
            <IconContext.Provider value={{className: "sidebar-item-icon"}}>
                {icons[name]}
            </IconContext.Provider>
            {name}
        </div>
    )
}

export default SidebarItem;