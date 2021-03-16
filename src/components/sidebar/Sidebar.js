import SidebarItem from './SidebarItem.js';
import './Sidebar.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

const sidebarItems = [
    'Search',
    'Favourites',
    'Playlist'
];

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="wrapper">
                <Logo className="logo" />
                <span>Menu</span>
                {sidebarItems.map(sidebarItem => <SidebarItem name={sidebarItem} key={sidebarItem} />)}
            </div>
        </div>
    );
}

export default Sidebar;