import "./Favourite.css";
import { useState } from "@hookstate/core";
import { favouriteAlbumsState, favouriteArtistsState } from "../../GlobalStates";
import Album from "../list_items/Album";
import Artist from "../list_items/Artist";

function Favourite() {

    const favouriteAlbums = useState(favouriteAlbumsState).get();
    const favouriteArtists = useState(favouriteArtistsState).get();
    const currentFilter = useState('albums');

    const mappedAlbums = favouriteAlbums.map(album => <Album album={album} key={album.id} />);
    const mappedArtists = favouriteArtists.map(artist => <Artist artist={artist} key={artist.id} />);

    return (
        <div>
            <h1 className="section-heading">Your favourites</h1>
            <div className="filter-controls">
                <button
                    className={`filter-control${currentFilter.get() === 'albums' ? ' active-filter' : ''}`}
                    onClick={() => currentFilter.set('albums')}>
                    Albums
                </button>
                <button
                    className={`filter-control right${currentFilter.get() === 'artists' ? ' active-filter' : ''}`}
                    onClick={() => currentFilter.set('artists')}>
                    Artist
                </button>
            </div>
            <div className="results-container">
                {currentFilter.get() === 'albums' ? mappedAlbums : mappedArtists}
            </div>
        </div>
    )

}

export default Favourite;