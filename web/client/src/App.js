import React from 'react';

// all text should have the fonts/styles in the App.css
import './App.css';

// router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// components
import Home from "./components/scene/home/Home";

// ui
import Typography from "@material-ui/core/Typography";
import Login from "./components/scene/login/Login";
import Protected from "./components/scene/protected/Protected";
import Authentication from "./components/auth/Authentication";
import HeaderComponent from "./components/static/HeaderComponent";

function App() {
    return (
        <Router>
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route exact path={["/", "/home"]}>
                        <Home/>
                    </Route>
                    <Route path={"/login"}>
                        <Login/>
                    </Route>
                    <Authentication>
                        <Route path={"/protected"}>
                            <Protected/>
                        </Route>
                    </Authentication>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
