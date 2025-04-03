import LifeHacksBoard from "./PrintPeaksFAinal/lifeHacksBoard/LifeHacksBoard";
import './bootstrap.css';
import './bootstrap.css.map';
import './App.css';
import './Colors.css';
import './StylesOld.css';
import './index.css';
import './global.css';
import {Provider} from "react-redux";
import store from "./stores/store";
import {BrowserRouter as Router} from 'react-router-dom'
import React from "react";
import AllWindow from "./components/AllWindow";

function App() {
    return (
        <div>

            <Provider store={store}>
                <Router>
                    <AllWindow/>
                </Router>
            </Provider>
        </div>
    )
}

export default App;
