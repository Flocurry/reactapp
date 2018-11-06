import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import MySnackbarContentWrapper from '../snackbar/MySnackbarContentWrapper';
// Material UI form validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// Material Core
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// Material Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    form: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
    },
    containerBtn: {
        marginLeft: theme.spacing.unit * 17,
        marginTop: theme.spacing.unit * 4,
    }
});

class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.isUnMounted = false;
        this.state = {
            showPassword: false,
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            variantSnackBar: 'success',
            messageSnackbar: '',
            formData: {
                username: '',
                password: ''
            },
            userExists: false,
            submitted: false
        };
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({
            formData,
            submitted: false
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleSubmit(e) {
        // Permet de ne pas rafraîchir la page sur le submit du form
        e.preventDefault();
        const { formData } = this.state;
        let username = formData['username'];
        let password = formData['password'];
        let variantSnackBar = this.state.variantSnackBar;
        let req = {
            url: process.env.REACT_APP_API_REST_URL + '/login/user?username=' + username + '&password=' + password,
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            let userExists = false;
            let messageSnackbar;
            let open;
            if (response.data.length > 0) {
                userExists = true;
                // setter
                localStorage.setItem('userLogged', JSON.stringify(response.data[0]));
                this.props.history.push('/home');
            }
            if (!userExists) {
                messageSnackbar = "This user doesn't exist";
                variantSnackBar = 'error';
                open = true;
            }
            // On change l'état du composant que si il est toujours dans le DOM
            // (Erreur de Login)
            if (!this.isUnMounted) {
                this.setState({
                    open: open,
                    messageSnackbar: messageSnackbar,
                    variantSnackBar: variantSnackBar,
                    userExists: userExists,
                    submitted: true
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // Méthode appelé juste avant que le composant soit démonté et détruit du DOM
    componentWillUnmount() {
        this.isUnMounted = true;
    }

    render() {
        const { showPassword, userExists, submitted, vertical, open, messageSnackbar, variantSnackBar, horizontal, formData } = this.state;
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <CssBaseline />
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    message={<span id="message-id">{messageSnackbar}</span>}>
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={variantSnackBar}
                        message={messageSnackbar} />
                </Snackbar>
                <ValidatorForm
                    className={classes.form}
                    ref="form"
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <TextValidator
                        className={classes.textField}
                        fullWidth
                        margin="normal"
                        label="Username"
                        onChange={this.handleChange}
                        ref="username"
                        name="username"
                        value={formData.username}
                        error={!userExists && submitted}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }} />
                    <TextValidator
                        className={classes.textField}
                        fullWidth
                        margin="normal"
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        error={!userExists && submitted}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}>
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />

                    <div className={classes.containerBtn}>
                        <Button
                            type="submit"
                            variant="raised"
                            size="small"
                            color="primary">
                            Login
                        </Button>
                    </div>
                </ValidatorForm>
            </React.Fragment >
        );
    }
}

export default withRouter(withStyles(styles)(FormLogin));