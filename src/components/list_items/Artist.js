import "./Artist.css";
import artistImage from "../../img/artist.png";
import { IconContext } from "react-icons";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import { axiosConfig, URL } from "../../AxiosConfig";
import { useState } from "@hookstate/core";
import {favouriteArtistsState, isOverlayShownState, overlayInfoState} from "../../GlobalStates";
import { useEffect } from 'react';

function Artist({ artist }) {
    const truncateString = longString => longString.length > 34 ? longString.substring(0, 33) + "…" : longString;

    const name = truncateString(artist.title);

    const isLiked = useState(false);
    const favouriteArtists = useState(favouriteArtistsState);
    const overlayInfo = useState(overlayInfoState);
    const isOverlayShown = useState(isOverlayShownState);

    useEffect(() => {
        favouriteArtists.get().forEach(favouriteArtist => {
            if (favouriteArtist.id === artist.id) isLiked.set(true);
        })
    }, []);

    function likeArtist() {
        if (isLiked.get()) {
            axios.get(`${URL}userfav/rmartist?id=${artist.id}`, axiosConfig)
                .then(res => {
                    if (res.status === 200) isLiked.set(false);
                    axios.get(`${URL}userfav/fetchartists`, axiosConfig)
                        .then(res => {
                            favouriteArtists.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            axios.post(`${URL}userfav/addartist`, artist, axiosConfig)
                .then(res => {
                    if (res.status === 200) isLiked.set(true);
                    axios.get(`${URL}userfav/fetchartists`, axiosConfig)
                        .then(res => {
                            favouriteArtists.set(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    if (err.response) console.log(err.response.data.message);
                });
        }
    }

    function updateOverlay() {
        overlayInfo.set({
            type: "artist",
            id: artist.id,
            title: name,
        });
        isOverlayShown.set(true);
    }

    return (
        <div className="artist-container">
            <img src={artistImage} alt="artist" />
            <p className="artist-name" onClick={updateOverlay}>{name}</p>
            <button className="artist-button" onClick={likeArtist}>
                <IconContext.Provider value={{className: "artist-button-icon"}}>
                    {isLiked.get() ? <IoHeart /> : <IoHeartOutline />}
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default Artist;