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

// ui
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {ThemeProvider, useTheme} from '@material-ui/core/styles';

// components
import Home from "./components/scene/home/Home";
import Login from "./components/scene/login/Login";
import Protected from "./components/scene/protected/Protected";
import Authentication from "./components/auth/Authentication";
import HeaderComponent from "./components/static/header/HeaderComponent";

// define theme here
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#005FAB"
        },
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider>
    );
}

function AppRouter() {
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
