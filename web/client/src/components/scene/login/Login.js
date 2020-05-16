import React from "react";
import {withRouter} from "react-router-dom";

// ui
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// imports
import axios from "axios";

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

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");

    const login = () => {

        // check validity of email & password
        if (!email || !password) {
            return showError("Missing email or password!");
        }

        // do request
        axios.defaults.withCredentials = true;
        axios.post(process.env.REACT_APP_API_BASE_URL + "/user/login", {
            email: email,
            password: password
        })
            .then(response => {
                // success! Alert data //TODO
                alert(response.data);
            })
            .catch(error => {
                localStorage.removeItem("user"); // instead of pushing back to login and getting stuck in the loop, this will stop the loop
                // show error
                if(error.response === undefined)
                    showError(error.response);
                else
                    showError(error.response.data.response);

            });
    };

    const showError = (text) => {
        if (text === undefined) text = "There was an error contacting the server!";
        setErrorText(text);
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h4"}>Login</Typography>
                        <Divider style={{marginTop: '20px'}}/>

                        {open ?
                            <Alert variant="outlined" severity="error"
                                   action={
                                       <IconButton
                                           aria-label="close"
                                           color="inherit"
                                           size="small"
                                           onClick={() => {
                                               setOpen(false);
                                           }}
                                       >
                                           <CloseIcon fontSize="inherit"/>
                                       </IconButton>
                                   }
                            >
                                {errorText}
                            </Alert>
                            : null}

                        <div style={{marginTop: '20px'}}>
                            <TextField onChange={e => setEmail(e.target.value)} id="email" label="Email"/>
                            <br/>
                            <TextField onChange={e => setPassword(e.target.value)} id="password" type="password"
                                       label="Password"
                                       style={{marginTop: '10px'}}/>
                            <br/>
                            <Button onClick={login} id="login-button" variant="contained"
                                    style={{marginTop: '40px'}}>Login</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(Login);