import SearchBar from "./SearchBar";
import Album from "../list_items/Album";
import { useState } from '@hookstate/core';
import { searchTermState, favouriteArtistsState, favouriteAlbumsState, playlistState } from "../../GlobalStates";
import { useEffect } from 'react';
import axios from "axios";
import { axiosConfig, URL } from "../../AxiosConfig";
import Artist from "../list_items/Artist";

function Search() {

    const searchTerm = useState(searchTermState).get();
    const searchStatus = useState("empty");
    const searchResults = useState([]);
    const favouriteArtists = useState(favouriteArtistsState);
    const favouriteAlbums = useState(favouriteAlbumsState);
    const playlist = useState(playlistState);

    useEffect(() => {
        axios.get(`${URL}userfav/fetchartists`, axiosConfig)
            .then(res => {
                favouriteArtists.set(res.data);
            })
            .catch(err => console.log(err));
        axios.get(`${URL}userfav/fetchalbums`, axiosConfig)
            .then(res => {
                favouriteAlbums.set(res.data);
            })
            .catch(err => console.log(err));
        axios.get(`${URL}playlist/list`, axiosConfig)
            .then(res => {
                playlist.set(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            searchStatus.set("empty");
            searchResults.set([]);
        }
        else {
            searchStatus.set("searching");
            const delaySearch = setTimeout(() => {
                axios.get(
                    `${URL}discogs/search?query="${searchTerm}"&page=1`,
                    axiosConfig
                )
                    .then(res => {
                        const albums = res.data.results;
                        searchResults.set(albums);
                        searchStatus.set("found");
                    })
                    .catch(err => console.log(err));
            }, 500);
            return () => clearTimeout(delaySearch);
        }
    }, [searchTerm]);

    return (
        <>
            <h1 className="section-heading">Search</h1>
            <SearchBar />
            {searchStatus.get() === "found" &&
                <>
                    <div className="results-container">
                        {searchResults.get().map(album => album.type === 1 ?
                            <Album album={album} key={album.id} />
                            :
                            <Artist artist={album} key={album.id} />
                        )}
                    </div>
                </>
            }
        </>
    )
}

export default Search;