import './App.css';
import Sidebar from './sidebar/Sidebar';
import { currentSection } from "./sidebar/Sidebar";
import { useState } from '@hookstate/core';
import Search from "./search/Search";

const components = {
    Search: <Search/>
}

function App() {

    const currentComponent = components[useState(currentSection).get()];

    return (
        <div className="App">
            <Sidebar />
            <div className="main-section">
                <div className="wrapper">
                    {currentComponent}
                </div>
            </div>
        </div>
    );
}

export default App;
