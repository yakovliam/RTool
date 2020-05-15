import React, {Component} from "react";
import Button from "@material-ui/core/Button";

// router
import {withRouter} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.props.history.push("/"); // go to home
    };

    render() {

        return (
            <Button color="inherit" onClick={this.onClick}>Home</Button>
        );
    }
}

export default withRouter(Home);