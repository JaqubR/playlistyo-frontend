import './Track.css';
import { IconContext } from "react-icons";
import { IoAdd, IoHeartOutline, IoHeart } from "react-icons/io5";
import albumCover from '../../img/albumcover.png';
import axios from "axios";
import {axiosConfig, URL} from "../../AxiosConfig";
import {useState} from "@hookstate/core";
import {favouriteAlbumsState } from "../../GlobalStates";
import { useEffect } from 'react';

function Track({ track }) {

    const truncateString = longString => longString.length > 36 ? longString.substring(0, 35) + "…" : longString;

    let [artist, title] = track.title.split(' - ');
    artist = truncateString(artist);
    title = truncateString(title);

    const isLiked = useState(false);
    const favouriteAlbums = useState(favouriteAlbumsState);

    useEffect(() => {
        favouriteAlbums.get().forEach(favouriteAlbum => {
            if (favouriteAlbum.id === track.id) isLiked.set(true);
        })
    }, []);

    function likeAlbum() {
        if (isLiked.get()) {
            axios.get(`${URL}userfav/rmalbum?id=${track.id}`, axiosConfig)
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
            axios.post(`${URL}userfav/addalbum`, track, axiosConfig)
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

    return (
        <div className="track-container">
            <img src={albumCover} alt="album-cover" />
            <div className="track-labels">
                <p className="track-title">{title}</p>
                <p className="track-author">{artist}</p>
            </div>
            <div className="track-buttons-container">
                <button className="track-button">
                    <IconContext.Provider value={{className: "track-button-icon"}}>
                        <IoAdd />
                    </IconContext.Provider>
                </button>
                <button className="track-button" onClick={likeAlbum}>
                    <IconContext.Provider value={{className: "track-button-icon"}}>
                        {isLiked.get() ? <IoHeart /> : <IoHeartOutline />}
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default Track;