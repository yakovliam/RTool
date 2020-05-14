import React from 'react';

// ui
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CssBaseline} from "@material-ui/core";

// components
import Login from '../button/Login';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function HeaderComponent() {

    const classes = useStyles();

    function isLoggedIn() {
        return localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined;
    }

    return (
        <div>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        RTool Panel
                    </Typography>
                    <Button color="inherit">Home</Button>
                    {isLoggedIn() ? (<Button color="inherit">Logout</Button>) : (
                       <Login/>)}
                </Toolbar>
            </AppBar>
        </div>
    );
};