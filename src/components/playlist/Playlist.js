import "./Playlist.css";
import Album from "../list_items/Album";
import { playlistState } from "../../GlobalStates";
import { useState } from "@hookstate/core";

function Playlist() {
    const playlist = useState(playlistState);

    return (
        <div>
            <h1 className="section-heading">Arrange your playlist</h1>
            <div className="results-container">
                {playlist.get().map(album => <Album album={album} key={album.id} />)}
            </div>
        </div>
    )
}

export default Playlist;