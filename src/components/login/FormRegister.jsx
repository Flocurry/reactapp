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
            allInputOk: false,
            fileIsUpload: false,
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
        let allInputOk = this.state.allInputOk;
        let fileIsUpload = this.state.fileIsUpload;
        if (e.target.files && e.target.files[0]) {
            fileIsUpload = true;
            let selectedFile = e.target.files[0];
            const reader = new FileReader();
            let self = this;
            reader.onload = function (r) {
                self.setState({
                    imageSrc: r.target.result,
                });
            }
            reader.readAsDataURL(selectedFile);
            this.setState({
                imageSrc: reader,
                fileIsUpload: fileIsUpload,
                formIsValid: allInputOk && fileIsUpload
            });
        }
    }

    deleteFile(e) {
        this.setState({
            fileIsUpload: false,
            imageSrc: null,
            formIsValid: false
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
        let allInputOk = this.state.allInputOk;
        let fileIsUpload = this.state.fileIsUpload;
        fields[fieldName] = e.target.value;
        let touched = this.state.touched;
        touched[fieldName] = true;
        let errors = {};

        // Validation username
        // Required
        if (!fields['username']) {
            allInputOk = false;
            errors['username'] = 'Username is required.';
        }
        else {
            // Length < 20
            if (fields['username'].length > 20) {
                allInputOk = false;
                errors['username'] = 'Username is up by 20 characters.';
            }
        }
        // Validation firstname
        // Required
        if (!fields['firstname']) {
            allInputOk = false;
            errors['firstname'] = 'Firstname is required.';
        }
        else {
            // Length < 20
            if (fields['firstname'].length > 20) {
                allInputOk = false;
                errors['firstname'] = 'Firstname is up by 20 characters.';
            }
        }
        // Validation lastname
        // Required
        if (!fields['lastname']) {
            allInputOk = false;
            errors['lastname'] = 'Lastname is required.';
        }
        else {
            // Length < 20
            if (fields['lastname'].length > 20) {
                allInputOk = false;
                errors['lastname'] = 'Lastname is up by 20 characters.';
            }
        }
        // Validation email
        let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Required
        if (!fields['email']) {
            allInputOk = false;
            errors['email'] = 'Email is required.';
        }
        else {
            // Valid adress
            allInputOk = regexp.test(fields['email']);
            if (!allInputOk) {
                errors['email'] = 'Email not valid.';
            }
        }
        // Validation password
        // Required
        if (!fields['password']) {
            allInputOk = false;
            errors['password'] = 'Password is required.';
        }
        else {
            // Length < 20
            if (fields['password'].length > 20) {
                allInputOk = false;
                errors['password'] = 'Password is up by 20 characters.';
            }
        }

        // On set l'état du composant
        this.setState({
            allInputOk: allInputOk,
            fileIsUpload: fileIsUpload,
            errors: errors,
            touched: touched,
            formIsValid: allInputOk && fileIsUpload
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
                                        <div hidden={!this.state.errors['username'] || !this.state.touched['username']} className="offset-sm-2 col-sm-8">
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
                                        <div hidden={!this.state.errors['firstname'] || !this.state.touched['firstname']} className="offset-sm-2 col-sm-8">
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
                                        <div hidden={!this.state.errors['lastname'] || !this.state.touched['lastname']} className="offset-sm-2 col-sm-8">
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
                                        <div hidden={!this.state.errors['email'] || !this.state.touched['email']} className="offset-sm-2 col-sm-8">
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
                                        <div hidden={!this.state.errors['password'] || !this.state.touched['password']} className="offset-sm-2 col-sm-8">
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