import React, { Component } from 'react';
import axios from 'axios';
// Material Core
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
// Material Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// CSS
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    form: {
        marginTop: theme.spacing.unit * 4
    },
    containerBtn: {
        marginTop: theme.spacing.unit * 4,
        textAlign: "center"
    },
    errorText: {
        marginTop: theme.spacing.unit * 3,
        fontSize: 12,
        color: 'red',
        textAlign: 'center'
    }
});

class FormLogin extends Component {

    state = {
        showPassword: false,
        fields: {},
        userExists: false,
        isLoginClicked: false
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    handleChange(event, fieldName) {
        let fields = this.state.fields;
        fields[fieldName] = event.target.value;
        this.setState({
            fields: fields
        });
        console.log(this.state.fields);
    }

    handleSubmit(e) {
        // Permet de ne pas rafraîchir la page sur le submit du form
        e.preventDefault();
        this.setState({
            userExists: false,
            isLoginClicked: true
        });
        // let username = this.state.fields.username;
        // let password = this.state.fields.password;
        // let req = {
        //     url: 'http://localhost/login/user?username=' + username + '&password=' + password,
        //     method: 'GET',
        //     withCredentials: true,
        //     credentials: 'same-origin'
        // }
        // // Arrow function permet d'avoir le this dans le callBack
        // axios(req).then(response => {
        //     let userExists = false;
        //     if (response.data.length > 0) {
        //         userExists = true;
        //         // setter
        //         localStorage.setItem('userLogged', JSON.stringify(response.data[0]));
        //         this.props.history.push('/home');
        //     }
        //     // On change l'état du composant que si il est toujours dans le DOM
        //     // (Erreur de Login)
        //     if (!this.isUnMounted) {
        //         this.setState({
        //             isLoginClicked: {
        //                 userExists: userExists
        //             }
        //         });
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        // });
    }

    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <CssBaseline />
                <form
                    className={classes.form}
                    // This syntax ensures `this` is bound within handleClick
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="normal"
                        label="Username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        error={!this.state.userExists && this.state.isLoginClicked}
                        onChange={(event) => this.handleChange(event, 'username')}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Password"
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
                        }}
                        error={!this.state.userExists && this.state.isLoginClicked}
                        onChange={(event) => this.handleChange(event, 'password')}
                    />
                    <div
                        className={classes.errorText}
                        hidden={this.state.userExists || !this.state.isLoginClicked}>
                        Incorrect username and/or password.
                    </div>
                    <div className={classes.containerBtn}>
                        <Button
                            type="submit"
                            variant="raised"
                            color="primary">
                            Login
                            </Button>
                    </div>
                </form>
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(FormLogin);