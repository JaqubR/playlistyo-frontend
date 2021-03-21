import './App.css';
import Sidebar from './sidebar/Sidebar';
import { currentSectionState, isAuthenticatedState, isOverlayShownState } from "../GlobalStates";
import { useState } from '@hookstate/core';
import Search from "./search/Search";
import Authentication from "./authentication/Authentication";
import { useEffect } from 'react';
import axios from "axios";
import { URL, axiosConfig } from "../AxiosConfig";
import Favourite from "./favourites/Favourite";
import Playlist from "./playlist/Playlist";
import Overlay from "./overlay/Overlay";

const components = {
    Search: <Search/>,
    Favourites: <Favourite />,
    Playlist: <Playlist />,
    Authentication: <Authentication />
}

function App() {

    const isAuthenticated = useState(isAuthenticatedState);
    const currentSection = useState(currentSectionState);
    const currentComponent = components[currentSection.get()];
    const isOverlayShown = useState(isOverlayShownState).get();

    useEffect(() => {
        axios.get(`${URL}auth`, axiosConfig)
            .then(res => isAuthenticated.set(res.status === 200))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        currentSection.set(isAuthenticated.get() ? 'Search' : 'Authentication');
    }, [isAuthenticated.get()]);

    function signOut() {
        axios.get(`${URL}logout`, axiosConfig)
            .then(res => {
                if (res.status === 200) isAuthenticated.set(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="App">
            {!isAuthenticated.get() ?
                <Authentication/>
                :
                <>
                    <Sidebar />
                    <div className="main-section">
                        <div className="wrapper">
                            {currentComponent}
                        </div>
                    </div>
                    <button onClick={signOut} />
                    {isOverlayShown && <Overlay />}
                </>
            }
        </div>
    );
}

export default App;
