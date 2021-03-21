import './Album.css';
import { IconContext } from "react-icons";
import { IoAdd, IoHeartOutline, IoHeart, IoRemove } from "react-icons/io5";
import albumCover from '../../img/albumcover.png';
import axios from "axios";
import { axiosConfig, URL } from "../../AxiosConfig";
import { useState } from "@hookstate/core";
import { favouriteAlbumsState, playlistState, overlayInfoState, isOverlayShownState } from "../../GlobalStates";
import { useEffect } from 'react';

function Album({ album }) {

    const truncateString = longString => longString.length > 34 ? longString.substring(0, 33) + "…" : longString;

    let [artist, title] = album.title.split(' - ');
    artist = truncateString(artist);
    title = truncateString(title);

    const isLiked = useState(false);
    const isAdded = useState(false);
    const favouriteAlbums = useState(favouriteAlbumsState);
    const playlist = useState(playlistState);
    const overlayInfo = useState(overlayInfoState);
    const isOverlayShown = useState(isOverlayShownState);

    useEffect(() => {
        favouriteAlbums.get().forEach(favouriteAlbum => {
            if (favouriteAlbum.id === album.id) isLiked.set(true);
        })
        playlist.get().forEach(playlistItem => {
            if (playlistItem.id === album.id) isAdded.set(true);
        })
    }, []);

    function likeAlbum() {
        if (isLiked.get()) {
            axios.get(`${URL}userfav/rmalbum?id=${album.id}`, axiosConfig)
                .then(res => {
                    if (res.status === 200) isLiked.set(false);
                    axios.get(`${URL}userfav/fetchalbums`, axiosConfig)
                        .then(res => {
                            favouriteAlbums.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            axios.post(`${URL}userfav/addalbum`, album, axiosConfig)
                .then(res => {
                    if (res.status === 200) isLiked.set(true);
                    axios.get(`${URL}userfav/fetchalbums`, axiosConfig)
                        .then(res => {
                            favouriteAlbums.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }

    function addAlbum() {
        if (isAdded.get()) {
            axios.delete(`${URL}playlist/listinsert?position=${playlist.get().map(e => e.id).indexOf(album.id) + 1}`, axiosConfig)
                .then(res => {
                    if (res.status === 200) isAdded.set(false);
                    axios.get(`${URL}playlist/list`, axiosConfig)
                        .then(res => {
                            playlist.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            axios.post(`${URL}playlist/listinsert`, {"album": album}, axiosConfig)
                .then(res => {
                    if (res.status === 200) isAdded.set(true);
                    axios.get(`${URL}playlist/list`, axiosConfig)
                        .then(res => {
                            playlist.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }

    function updateOverlay() {
        overlayInfo.set({
            type: "album",
            id: album.id,
            master_id: album.master_id,
            title: title,
            artist: artist
        });
        isOverlayShown.set(true);
    }

    return (
        <div className="album-container">
            <img src={albumCover} alt="album-cover" />
            <div className="album-labels" onClick={updateOverlay}>
                <p className="album-title">{title}</p>
                <p className="album-author">{artist}</p>
            </div>
            <div className="album-buttons-container">
                <button className="album-button" onClick={addAlbum}>
                    <IconContext.Provider value={{className: "album-button-icon"}}>
                        {isAdded.get() ? <IoRemove /> : <IoAdd />}
                    </IconContext.Provider>
                </button>
                <button className="album-button" onClick={likeAlbum}>
                    <IconContext.Provider value={{className: "album-button-icon"}}>
                        {isLiked.get() ? <IoHeart /> : <IoHeartOutline />}
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default Album;