import SidebarItem from "./SidebarItem.js";
import "./Sidebar.css";
import { useState } from "react";

function Sidebar() {
  const [currentMenuItem, setCurrentMenuItem] = useState("search");

  return (
    <div className="sidebar">
      <SidebarItem
        name="Search"
        icon="search"
        isActive={currentMenuItem === "search"}
        clickHandler={() => setCurrentMenuItem("search")}
      />
      <SidebarItem
        name="Favourites"
        icon="heart"
        isActive={currentMenuItem === "favourites"}
        clickHandler={() => setCurrentMenuItem("favourites")}
      />
      <SidebarItem
        name="Playlist"
        icon="playlist"
        isActive={currentMenuItem === "playlist"}
        clickHandler={() => setCurrentMenuItem("playlist")}
      />
      lol
    </div>
  );
}

export default Sidebar;
