import React from "react";

// axios for fetch
import axios from 'axios';

// router
import {withRouter} from 'react-router-dom';

class Authentication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        };

        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    isAuthenticated = () => {
        // two steps here:
        // 1) Check the localStorage
        // 2) Query API to see if the key still works

        // check localStorage
        const user = localStorage.getItem("user"); // get user

        if (!user) { // if no user, push to login page
            return this.props.history.push("/login");
        }

        // now check API
        // get user object from post
        axios.defaults.withCredentials = true;
        axios.post(process.env.REACT_APP_API_BASE_URL+ "/user/get")
            .then(response => {
                this.setState({user: response.data});
            })
            .catch(error => {
                localStorage.removeItem("user"); // instead of pushing back to login and getting stuck in the loop, this will stop the loop
                setTimeout(this.props.history.push("/login"), 10);
            });
    };

    componentDidMount() {
        this.isAuthenticated();
    }

    render() {
        if (!this.state.user) {
            return (
                //TODO loading spinner, ya know?
                <div>Loading</div>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Authentication);