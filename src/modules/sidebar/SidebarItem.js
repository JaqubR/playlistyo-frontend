import './SidebarItem.css';
import { IconContext } from "react-icons";
import { IoHeart, IoSearch, IoMusicalNotes } from "react-icons/io5";
import { currentSection } from "./Sidebar";
import { useState } from '@hookstate/core';

const icons = {
    Favourites: <IoHeart />,
    Search: <IoSearch />,
    Playlist: <IoMusicalNotes />
}

function SidebarItem({ name }) {

    const currentMenuItem = useState(currentSection);

    return (
        <div
            className={currentMenuItem.get() === name ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => currentMenuItem.set(name)}
        >
            <IconContext.Provider value={{className: "sidebar-item-icon"}}>
                {icons[name]}
            </IconContext.Provider>
            {name}
        </div>
    )
}

export default SidebarItem;