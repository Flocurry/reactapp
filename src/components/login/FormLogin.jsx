import React, { Component } from 'react';
import axios from 'axios';
import NavBarBtn from './NavBarBtn';

class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.isUnMounted = false;
        this.state = {
            fields: {},
            isLoginClicked: {}
        }
    }

    handleChange(fieldName, e) {
        let fields = this.state.fields;
        fields[fieldName] = e.target.value;
        this.setState({
            fields: fields
        });
    }

    handleSubmit(e) {
        // Permet de ne pas rafraîchir la page sur le submit du form
        e.preventDefault();

        let username = this.state.fields.username;
        let password = this.state.fields.password;
        let req = {
            url: 'http://localhost/login/user?username=' + username + '&password=' + password,
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            let userExists = false;
            if (response.data.length === 1) {
                userExists = true;
                // setter
                localStorage.setItem('userLogged', JSON.stringify(response.data[0]));
                this.props.history.push('/home');
            }
            // On change l'état du composant que si il est toujours dans le DOM
            // (Erreur de Login)
            if (!this.isUnMounted) {
                this.setState({
                    isLoginClicked: {
                        userExists: userExists
                    }
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
        return (
            <div className="container-fluid bg-light py-3">
                <NavBarBtn />
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form
                                // This syntax ensures `this` is bound within handleClick
                                onSubmit={(e) => this.handleSubmit(e)}>
                                <div hidden={!('userExists' in this.state.isLoginClicked) || this.state.isLoginClicked.userExists} className="alert alert-danger">
                                    <strong>Fail!</strong> The user doesn't exist.
                                </div>
                                <div hidden={!this.state.isLoginClicked.userExists} className="alert alert-success">
                                    <strong>Success!</strong> The user exists.
                                </div>
                                <fieldset>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="username" type="text" className="form-control" placeholder="username"
                                                onChange={(e) => this.handleChange('username', e)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-lock text-info"></i></div>
                                            </div>
                                            <input name="password" type="password" className="form-control" placeholder="password"
                                                onChange={(e) => this.handleChange('password', e)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                            <button type="submit" className="btn btn-secondary-outline btn-lg btn-block">Login</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormLogin;