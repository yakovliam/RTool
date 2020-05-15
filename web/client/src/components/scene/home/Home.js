import React from "react";

// ui
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        margin: 'auto',
        color: theme.palette.text.secondary,
    },
}));

const Home = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h4"}>Home</Typography>
                        <Divider  style={{marginTop: '20px'}}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;