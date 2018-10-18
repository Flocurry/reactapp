import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            gender: null,
            color: null,
            anchorEl: null,
        }
    }

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        console.log('test');

        this.setState({
            anchorEl: null
        });
    };

    getGender(sexe) {
        let gender = 'Mr';
        if (sexe === 'Femme') {
            gender = 'Mlle';
        }
        return gender;
    }

    handleLogout = (e) => {
        e.preventDefault();
        let req = {
            url: process.env.REACT_APP_API_REST_URL + '/users/logout',
            method: 'PUT',
            data: this.state.user
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            // On supprime tous les localStorage
            localStorage.clear();
            // Redirection vers le composant login
            this.props.history.push('/login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('userLogged'));
        let gender = this.getGender(user.sexe);
        let color = 'grey';
        this.setState({
            user: user,
            gender: gender,
            color: color
        });
    }

    render() {
        const anchorEl = this.state.anchorEl;
        const open = Boolean(anchorEl);
        const titleTooltip = 'Hello ' + this.state.gender + '. ' + this.state.user.username;
        return (
            <div>
                <Typography color="inherit" noWrap>
                    <Tooltip title={titleTooltip}>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </Menu>
                </Typography>
            </div >
        );
    }
}

export default withRouter(Logout);