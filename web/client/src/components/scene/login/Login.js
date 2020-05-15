import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
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

const Login = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h4"}>Login</Typography>
                        <Divider  style={{marginTop: '20px'}}/>

                        <div style={{marginTop: '20px'}}>
                            <TextField id="email" label="Email" />
                            <br/>
                            <TextField id="password" label="Password" style={{marginTop: '10px'}} />
                            <br/>
                            <Button id="login-button" variant="contained" style={{marginTop: '40px'}}>Login</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;