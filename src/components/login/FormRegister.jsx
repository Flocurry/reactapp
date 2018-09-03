import React, { Component } from 'react';
import axios from 'axios';
// Components
import NavBarBtn from './NavBarBtn';
import RadioBtn from './RadioBtn';
import SelectRole from './SelectRole';
import UploadFile from './UploadFile';
// CSS
import './FormRegister.css';

class FormRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: null,
            fields: {},
            errors: {},
            roles: [],
            touched: {
                username: false,
                password: false
            },
            formIsValid: false
        }
    }

    onFileChanged(e) {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            const reader = new FileReader();
            let self = this;
            reader.onload = function (r) {
                self.setState({
                    imageSrc: r.target.result
                });
            }
            reader.readAsDataURL(selectedFile);
            this.setState({ imageSrc: reader });

        }
    }

    deleteFile(e) {
        this.setState({
            imageSrc: null
        });
        document.getElementById('fileInput').value = '';
        
    }

    componentDidMount() {
        let req = {
            url: 'http://localhost/roles',
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            this.setState({
                roles: response.data
            });

        }).catch(function (error) {
            console.log(error);
        });
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
                            <div className="wrapper">
                                <img src={this.state.imageSrc || 'https://bluecowsoftware.com/wp-content/uploads/2016/10/05-512.png'} alt="Test" />
                            </div>
                            <h3 className="text-center mb-4">Register</h3>
                            <form>
                                <fieldset>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="username" type="text" className="form-control" placeholder="username"
                                                onChange={(e) => this.handleValidation('username', e)} />
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
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="firstname" type="text" className="form-control" placeholder="firstname"
                                                onChange={(e) => this.handleValidation('firstname', e)} />
                                        </div>
                                        <div hidden={!this.state.errors['firstname']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['firstname']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="lastname" type="lastname" className="form-control" placeholder="lastname"
                                                onChange={(e) => this.handleValidation('lastname', e)} />
                                        </div>
                                        <div hidden={!this.state.errors['lastname']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['lastname']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                            </div>
                                            <input name="email" type="text" className="form-control" placeholder="email"
                                                onChange={(e) => this.handleValidation('email', e)} />
                                        </div>
                                        <div hidden={!this.state.errors['email']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['email']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-lock text-info"></i></div>
                                            </div>
                                            <input name="password" type="password" className="form-control" placeholder="password"
                                                onChange={(e) => this.handleValidation('password', e)} />
                                        </div>
                                        <div hidden={!this.state.errors['password']} className="offset-sm-2 col-sm-8">
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.errors['password']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <SelectRole
                                        datas={this.state.roles} />
                                    <RadioBtn />
                                    <UploadFile
                                        change={(e) => this.onFileChanged(e)}
                                        delete={(e) => this.deleteFile(e)} />
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