import "./Search.css";
import SearchBar from "./SearchBar";
import Track from "../list_items/Track";
import {useState} from '@hookstate/core';
import { searchTermState, favouriteArtistsState, favouriteAlbumsState } from "../../GlobalStates";
import {useEffect} from 'react';
import axios from "axios";
import {axiosConfig, URL} from "../../AxiosConfig";
import Artist from "../list_items/Artist";

function Search() {

    const searchTerm = useState(searchTermState).get();
    const searchStatus = useState("empty");
    const searchResults = useState([]);
    const favouriteArtists = useState(favouriteArtistsState);
    const favouriteAlbums = useState(favouriteAlbumsState);

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
        <div className="search">
            <SearchBar />
            {searchStatus.get() === "found" &&
                <>
                    <h2 className="section-heading">
                        Search results:
                    </h2>
                    <div className="tracks-container">
                        {searchResults.get().map(album => album.type === 1 ?
                            <Track track={album} key={album.id} />
                            :
                            <Artist artist={album} key={album.id} />
                        )}
                    </div>
                </>
            }
            {searchStatus.get() === "empty" &&  <h2 className="section-heading">Search for something</h2>}
            {searchStatus.get() === "searching" &&  <h2 className="section-heading">Searching...</h2>}
        </div>
    )
}

export default Search;