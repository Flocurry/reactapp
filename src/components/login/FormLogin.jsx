import React, { Component } from 'react';
import axios from 'axios';
import NavBarBtn from './NavBarBtn';

class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            isLoginClicked: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(fieldName, e) {
        let fields = this.state.fields;
        fields[fieldName] = e.target.value;
        this.setState({
            fields: fields
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let username = this.state.fields.username;
        let password = this.state.fields.password;
        let self = this;

        axios.get('http://localhost/login/user?username=' + username + '&password=' + password,
            {
                withCredentials: true,
                credentials: 'same-origin'
            })
            .then(function (response) {
                let userExists = false;
                if (response.data.length === 1) {
                    userExists = true;
                    self.props.history.push('/home');
                }
                self.setState({
                    isLoginClicked: {
                        userExists: userExists
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container-fluid bg-light py-3">
                <NavBarBtn />
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form onSubmit={this.handleSubmit}>
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
                                            <input name="username" type="text" className="form-control" placeholder="username" onChange={this.handleChange.bind(this, 'username')} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-lock text-info"></i></div>
                                            </div>
                                            <input name="password" type="password" className="form-control" placeholder="password" onChange={this.handleChange.bind(this, 'password')} />
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