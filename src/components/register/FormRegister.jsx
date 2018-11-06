import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Material UI form validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// Material Core
import {
  IconButton,
  Button,
  CssBaseline,
  MenuItem,
  Snackbar,
  Avatar,
  InputAdornment
} from '@material-ui/core';
// Material Icons
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff,
  Delete
} from '@material-ui/icons';
// CSS
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  avatar: {
    marginTop: theme.spacing.unit * 4,
    width: 110,
    height: 110,
    size: 20
  },
  textField: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  containerInputFile: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  containerBtn: {
    marginLeft: theme.spacing.unit * 17,
    marginTop: theme.spacing.unit * 4
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 20
  },
});

const unkownAvatar = 'https://bluecowsoftware.com/wp-content/uploads/2016/10/05-512.png';

class FormRegister extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      userExists: false,
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      messageSnackbar: '',
      formData: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        sexe: '',
        role_id: '',
        image: ''
      },
      roles: [],
      submitted: false,
      avatar: unkownAvatar
    }
    // preserve the initial state in a new object
    this.baseState = this.state
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleSubmit = (event) => {
    // Permet de ne pas rafraîchir la page sur le submit du form
    event.preventDefault();
    const { formData } = this.state;
    let _formData = new FormData();
    _formData.append("username", formData['username']);
    _formData.append("firstname", formData['firstname']);
    _formData.append("lastname", formData['lastname']);
    _formData.append("sexe", formData['sexe']);
    _formData.append("email", formData['email']);
    _formData.append("password", formData['password']);
    _formData.append("image", formData['image']);
    _formData.append("role_id", formData['role_id']);

    let req = {
      url: process.env.REACT_APP_API_REST_URL + '/users/save',
      method: 'POST',
      data: _formData,
      withCredentials: true,
      credentials: 'same-origin',
    }
    // Arrow function permet d'avoir le this dans le callBack
    axios(req).then(response => {
      let userAdded = response.data.successAdd;
      let messageSnackbar = 'Error! User not added!';
      if (userAdded) {
        messageSnackbar = 'User added with success!';
      }
      // On vide le champ input file
      document.getElementById('fileInput').value = '';
      this.setState({
        userAdded: userAdded,
        submitted: true,
        open: true,
        messageSnackbar: messageSnackbar,
        formData: {
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          sexe: '',
          role_id: '',
          image: ''
        },
        avatar: unkownAvatar
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleChangeFile = (event) => {
    const { formData } = this.state;
    if (event.target.files && event.target.files[0]) {
      let selectedFile = event.target.files[0];
      formData['image'] = selectedFile;
      // allInputState[fieldName] = true;
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          avatar: event.target.result,
        });
      }
      reader.readAsDataURL(selectedFile);
      this.setState({
        avatar: this.state.avatar,
        formData: formData
      });
    }
  }

  deleteFile = (event) => {
    event.preventDefault()
    this.setState({
      avatar: unkownAvatar
    });
    document.getElementById('fileInput').value = '';
  }

  componentDidMount() {
    // Récupérer les roles pour la select list
    let req = {
      url: process.env.REACT_APP_API_REST_URL + '/roles',
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

  render() {
    const { showPassword, formData, vertical, horizontal, open, messageSnackbar, avatar } = this.state;
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageSnackbar}</span>} />
        <Avatar
          src={avatar}
          className={classes.avatar} />
        <ValidatorForm
          className={classes.form}
          ref="form"
          onSubmit={this.handleSubmit}>
          <TextValidator
            className={classes.textField}
            fullWidth
            margin="normal"
            label="Username"
            onChange={this.handleChange}
            name="username"
            value={formData.username}
            validators={['required']}
            errorMessages={['this field is required']}
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
            label="Firstname"
            onChange={this.handleChange}
            name="firstname"
            value={formData.firstname}
            validators={['required']}
            errorMessages={['this field is required']}
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
            label="Lastname"
            onChange={this.handleChange}
            name="lastname"
            value={formData.lastname}
            validators={['required']}
            errorMessages={['this field is required']}
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
            label="Email"
            onChange={this.handleChange}
            name="email"
            value={formData.email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
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
            validators={['required']}
            errorMessages={['this field is required']}
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
          <TextValidator
            className={classes.textField}
            fullWidth
            margin="normal"
            label="Sexe"
            onChange={this.handleChange}
            name="sexe"
            select
            value={formData.sexe}
            validators={['required']}
            errorMessages={['this field is required']}>
            <MenuItem value="Homme">Homme</MenuItem>
            <MenuItem value="Femme">Femme</MenuItem>
          </TextValidator>
          <TextValidator
            className={classes.textField}
            fullWidth
            margin="normal"
            label="Role"
            onChange={this.handleChange}
            name="role_id"
            select
            value={formData.role_id}
            validators={['required']}
            errorMessages={['this field is required']}>
            {this.state.roles.map((role, index) => {
              return ([
                <MenuItem value={role.role_id}>{role.libelle}</MenuItem>
              ])
            })}
          </TextValidator>
          <div className={classes.containerInputFile}>
            <Button
              variant="raised">
              <input
                id='fileInput'
                type="file"
                onChange={this.handleChangeFile} />
              <Delete className={classes.icon}
                onClick={this.deleteFile} />
            </Button>
          </div>
          <div className={classes.containerBtn}>
            <Button
              type="submit"
              variant="raised"
              size="small"
              color="primary">
              Register
            </Button>
          </div>
        </ValidatorForm>
      </React.Fragment >
    );
  }
}

FormRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormRegister);