import React, {Component} from "react";
import Button from "@material-ui/core/Button";

// router
import {withRouter} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.props.history.push("/login");
    };

    render() {

        return (
            <Button color="inherit" onClick={this.onClick}>Login</Button>
        );
    }
}

export default withRouter(Login);