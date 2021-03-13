import './SidebarItem.css';
import { IconContext } from "react-icons";
import { IoHeart, IoSearch, IoMusicalNotes } from "react-icons/io5";

const icons = {
    heart: <IoHeart />,
    search: <IoSearch />,
    playlist: <IoMusicalNotes />
}

function SidebarItem(props) {
    return (
        <div className={props.isActive ? 'sidebar-item active' : 'sidebar-item'} onClick={props.clickHandler}>
            <IconContext.Provider value={{className: "sidebar-item-icon"}}>
                {icons[props.icon]}
            </IconContext.Provider>
            {props.name}
        </div>
    )
}

export default SidebarItem;