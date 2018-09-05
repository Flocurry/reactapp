import React, { Component } from 'react';
import axios from 'axios';
import NavBarApp from '../navbar/NavBarApp';
import Grid from '../grid/Grid';
import Paginator from '../grid/Paginator';

class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            isLoaded: false,
            userDeleted: false
        }
    }

    componentDidMount() {
        let req = {
            url: 'http://localhost/users',
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            this.setState({
                users: response.data,
                isLoaded: true
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    // Appelée une fois que l'on clique sur la corbeille du deleteUser
    componentWillUpdate() {
        let req = {
            url: 'http://localhost/users',
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            this.setState({
                users: response.data,
                isLoaded: true
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteUser(userId, e) {
        e.preventDefault();
        let req = {
            url: 'http://localhost/users/delete/' + userId,
            method: 'DELETE',
            withCredentials: true,
            credentials: 'same-origin',
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            let userDeleted = response.data.successDelete;
            this.setState({
                userDeleted: userDeleted
            });
        }).catch(function (error) {
            console.log(error);
        });

    }

    render() {
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return (
            <div>
                <NavBarApp />
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default panel-table">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col col-xs-6">
                                            <h3 className="panel-title">Users</h3>
                                        </div>
                                    </div>
                                </div>
                                <Grid
                                    users={this.state.users}
                                    deleteUser={(userId, e) => this.deleteUser(userId, e)} />
                                <div className="panel-footer">
                                    <Paginator />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;