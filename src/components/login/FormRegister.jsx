import React, { Component } from 'react';
import NavBarBtn from './NavBarBtn';

class FormRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            touched: {
                username: false,
                password: false
            },
            formIsValid: false
        }
    }

    handleValidation(fieldName, e) {
        let fields = this.state.fields;
        fields[fieldName] = e.target.value;
        let touched = this.state.touched;
        touched[fieldName] = true;
        let errors = {};
        let formIsValid = true;

        // Validation username si input touched
        if (touched['username']) {
            // Required
            if (!fields['username']) {
                formIsValid = false;
                errors['username'] = 'Username is required.';
            }
            else {
                // Length < 20
                if (fields['username'].length > 20) {
                    formIsValid = false;
                    errors['username'] = 'Username is up by 20 characters.';
                }
            }
        }
        // Validation password si input touched
        if (touched['password']) {
            // Required
            if (!fields['password']) {
                formIsValid = false;
                errors['password'] = 'Password is required.';
            }
            else {
                // Length < 20
                if (fields['password'].length > 20) {
                    formIsValid = false;
                    errors['password'] = 'Password is up by 20 characters.';
                }
            }
        }
        // On set l'état du composant
        this.setState({
            errors: errors,
            touched: touched,
            formIsValid: formIsValid
        });
    }

    render() {
        return (
            <div className="container-fluid bg-light py-3">
                <NavBarBtn />
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Register</h3>
                            <form>
                                <fieldset>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="username" type="text" className="form-control" placeholder="username" onChange={this.handleValidation.bind(this, "username")} />
                                        </div>
                                        <div hidden={!this.state.errors['username']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['username']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-lock text-info"></i></div>
                                            </div>
                                            <input name="password" type="password" className="form-control" placeholder="password" onChange={this.handleValidation.bind(this, "password")} />
                                        </div>
                                        <div hidden={!this.state.errors['password']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['password']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                            <button disabled={!this.state.formIsValid} type="submit" className="btn btn-secondary-outline btn-lg btn-block">Register</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}

export default FormRegister;