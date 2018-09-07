import React, { Component } from 'react';
import axios from 'axios';
// Components
import NavBarBtn from '../login/NavBarBtn';
import RadioBtn from './RadioBtn';
import SelectRole from './SelectRole';
import UploadFile from './UploadFile';
import Input from './Input';
// CSS
import './FormRegister.css';

class FormRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: null,
            allInputState: {
                username: false,
                firstname: false,
                lastname: false,
                password: false,
                image: false
            },
            fields: {
                role_id: 1,
                sexe: 'Homme'
            },
            errors: {},
            roles: [],
            touched: {},
            formIsValid: false,
            userAdded: false,
            registerIsClicked: false
        }
    }

    onFileChanged(fieldName, e) {
        let fields = this.state.fields;
        let allInputState = this.state.allInputState;
        let formIsValid = this.state.formIsValid;
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            fields[fieldName] = selectedFile;
            allInputState[fieldName] = true;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    imageSrc: e.target.result,
                });
            }
            reader.readAsDataURL(selectedFile);
            let arrAllInputState = Object.keys(this.state.allInputState).map((keyName) => {
                let ret = true;
                if (this.state.allInputState[keyName] === false) {
                    ret = false;
                }
                return ret;
            });

            formIsValid = !(arrAllInputState.indexOf(false) > -1);

            this.setState({
                imageSrc: reader,
                formIsValid: formIsValid
            });
        }
    }

    deleteFile(e) {
        e.preventDefault()
        this.setState({
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

    handleChange(fieldName, checkEmpty, checkLength, checkPattern, e) {
        let fields = this.state.fields;
        let touched = this.state.touched;
        let errors = this.state.errors;
        let allInputState = this.state.allInputState;
        let formIsValid = this.state.formIsValid;
        fields[fieldName] = e.target.value;
        touched[fieldName] = true;
        errors[fieldName] = null;
        allInputState[fieldName] = true;

        if (checkPattern) {
            // Validation email
            let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // Valid adress
            if (!regexp.test(fields['email'])) {
                errors['email'] = fieldName + ' not valid.';
            }
        }
        // Required
        if (checkEmpty) {
            if (!fields[fieldName]) {
                errors[fieldName] = fieldName + ' is required.';
                allInputState[fieldName] = false;
            }
        }
        if (checkLength) {
            // Length < 20
            if (fields[fieldName].length > 20) {
                errors[fieldName] = fieldName + ' is up by 20 characters.';
                allInputState[fieldName] = false;
            }
        }


        let arrAllInputState = Object.keys(this.state.allInputState).map((keyName) => {
            let ret = true;
            if (this.state.allInputState[keyName] === false) {
                ret = false;
            }
            return ret;
        });

        formIsValid = !(arrAllInputState.indexOf(false) > -1);

        this.setState({
            fields: fields,
            touched: touched,
            errors: errors,
            allInputState: allInputState,
            formIsValid: formIsValid
        });
    }

    onChangeRole(fieldName, value) {
        let fields = this.state.fields;
        fields[fieldName] = value;
        this.setState({
            fields: fields
        });
    }

    onChangeSexe(fieldName, value) {
        let fields = this.state.fields;
        fields[fieldName] = value;
        this.setState({
            fields: fields
        });
    }

    onSubmitForm(e) {
        // Permet de ne pas rafraîchir la page sur le submit du form
        e.preventDefault();
        let _formData = new FormData();
        _formData.append("username", this.state.fields['username']);
        _formData.append("firstname", this.state.fields['firstname']);
        _formData.append("lastname", this.state.fields['lastname']);
        _formData.append("sexe", this.state.fields['sexe']);
        _formData.append("email", this.state.fields['email']);
        _formData.append("password", this.state.fields['password']);
        _formData.append("image", this.state.fields['image']);
        _formData.append("role_id", this.state.fields['role_id']);

        let req = {
            url: 'http://localhost/users/save',
            method: 'POST',
            data: _formData,
            withCredentials: true,
            credentials: 'same-origin',
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            let userAdded = response.data.successAdd;
            // On change l'état du composant que si il est toujours dans le DOM
            // (Erreur de Login)
            this.setState({
                userAdded: userAdded,
                registerIsClicked: true
            });
        }).catch(function (error) {
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
                            <div className="wrapper">
                                <img src={this.state.imageSrc || 'https://bluecowsoftware.com/wp-content/uploads/2016/10/05-512.png'} alt="Test" />
                            </div>
                            <h3 className="text-center mb-4">Register</h3>
                            <form onSubmit={(e) => this.onSubmitForm(e)} >
                                <div hidden={!this.state.userAdded || !this.state.registerIsClicked} className="alert alert-success">
                                    <strong>Success!</strong> The user has been created.
                                </div>
                                <div hidden={this.state.userAdded || !this.state.registerIsClicked} className="alert alert-danger">
                                    <strong>Fail!</strong> The user has not been created.
                                 </div>
                                <fieldset>
                                    <Input
                                        name='username'
                                        type='text'
                                        faIcon='fa fa-user text-info'
                                        validation={true}
                                        errors={this.state.errors}
                                        touched={this.state.touched}
                                        checkEmpty={true}
                                        checkLength={true}
                                        handleChange={(fieldName, checkEmpty, checkLength, checkPattern, e) => this.handleChange(fieldName, checkEmpty, checkLength, checkPattern, e)} />
                                    <Input
                                        name='firstname'
                                        type='text'
                                        faIcon='fa fa-user text-info'
                                        validation={true}
                                        errors={this.state.errors}
                                        touched={this.state.touched}
                                        checkEmpty={true}
                                        checkLength={true}
                                        handleChange={(fieldName, checkEmpty, checkLength, checkPattern, e) => this.handleChange(fieldName, checkEmpty, checkLength, checkPattern, e)} />
                                    <Input
                                        name='lastname'
                                        type='text'
                                        faIcon='fa fa-user text-info'
                                        validation={true}
                                        errors={this.state.errors}
                                        touched={this.state.touched}
                                        checkEmpty={true}
                                        checkLength={true}
                                        handleChange={(fieldName, checkEmpty, checkLength, checkPattern, e) => this.handleChange(fieldName, checkEmpty, checkLength, checkPattern, e)} />
                                    <Input
                                        name='email'
                                        type='text'
                                        faIcon='fa fa-envelope text-info'
                                        validation={true}
                                        errors={this.state.errors}
                                        touched={this.state.touched}
                                        checkEmpty={true}
                                        checkPattern={true}
                                        handleChange={(fieldName, checkEmpty, checkLength, checkPattern, e) => this.handleChange(fieldName, checkEmpty, checkLength, checkPattern, e)} />
                                    <Input
                                        name='password'
                                        type='password'
                                        faIcon='fa fa-lock text-info'
                                        validation={true}
                                        errors={this.state.errors}
                                        touched={this.state.touched}
                                        checkEmpty={true}
                                        checkLength={true}
                                        handleChange={(fieldName, checkEmpty, checkLength, checkPattern, e) => this.handleChange(fieldName, checkEmpty, checkLength, checkPattern, e)} />
                                    <SelectRole
                                        datas={this.state.roles}
                                        onChangeRole={(fieldName, value) => this.onChangeRole(fieldName, value)} />
                                    <RadioBtn
                                        onChangeSexe={(fieldName, value, e) => this.onChangeSexe(fieldName, value, e)} />
                                    <UploadFile
                                        name='image'
                                        change={(fieldName, e) => this.onFileChanged(fieldName, e)}
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