import "./Overlay.css";
import { useState } from "@hookstate/core";
import getDiscography from "../../functions/discography";
import Track from "../list_items/Track";
import getTracklist from "../../functions/tracklist";
import { useEffect } from 'react';
import { isOverlayShownState, overlayInfoState } from "../../GlobalStates";
import Album from "../list_items/Album";

function Overlay() {

    const results = useState([]);
    const isOverlayShown = useState(isOverlayShownState);
    const overlayInfo = useState(overlayInfoState).get();

    useEffect(() => {
        if (overlayInfo.type === 'album') {
            getTracklist(overlayInfo.id, overlayInfo.master_id)
                .then(tracks => results.set(tracks.tracklist))
                .catch(err => console.log(err));
        } else if (overlayInfo.type === 'artist') {
            getDiscography(overlayInfo.id, overlayInfo.page)
                .then(discography => results.set(discography.releases))
                .catch(err => console.log(err));
        }
    }, [])

    const createList = () => {
        if (overlayInfo.type === 'album') return results.get().map(track => <Track title={track} artist={overlayInfo.title} />);
        else if (overlayInfo.type === 'artist') return results.get().map(album => <Album album={album} key={album.id} />);
    }

    return (
        <>
            <div className="overlay-background" onClick={() => isOverlayShown.set(false)} />
            <div className="overlay">
                <div className="overlay-info">
                    <div className="mock-image" />
                    <div className="overlay-labels">
                        <h2 className="overlay-title">{overlayInfo.title}</h2>
                        {overlayInfo.type === "album" && <h4 className="overlay-subtitle">{overlayInfo.artist}</h4>}
                    </div>
                </div>
                <div className="results-container">
                    {results.get() && createList()}
                </div>
            </div>
        </>
    );
}

export default Overlay;