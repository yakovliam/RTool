import React, {Component} from "react";
import Button from "@material-ui/core/Button";

// router
import {withRouter} from 'react-router-dom';
import axios from "axios";

class Logout extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        // Send request to logout api
        axios.defaults.withCredentials = true;
        axios.post(process.env.REACT_APP_API_BASE_URL + "/user/logout")
            .then(response => {
                localStorage.removeItem("user"); // remove user data from localStorage
                setTimeout(this.props.history.push("/login"), 10); // go to login page
            })
            .catch(error => {
                localStorage.removeItem("user"); // remove user data from localStorage
                setTimeout(this.props.history.push("/login"), 10); // go to login page
            });
    };

    render() {

        return (
            <Button color="inherit" onClick={this.onClick}>Logout</Button>
        );
    }
}

export default withRouter(Logout);