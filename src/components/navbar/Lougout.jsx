import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Lougout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            gender: null,
            color: null
        }
    }

    getGender(sexe) {
        let gender = 'Mr';
        if (sexe === 'Femme') {
            gender = 'Mlle';
        }
        return gender;
    }

    changeColor(param, e) {
        e.preventDefault();
        this.setState({
            color: param
        });
    }

    logout(e) {
        e.preventDefault();
        let req = {
            url: 'http://localhost/users/logout',
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
        return (
            <div>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret
                        style={{ color: this.state.color }}
                        // This syntax (arow function) ensures `this` is bound within handleClick
                        onMouseOver={(e) => this.changeColor('blue', e)}
                        onMouseLeave={(e) => this.changeColor('grey', e)}>
                        <span className="fa fa-user"></span> {this.state.gender}. {this.state.user.username}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={(e) => this.logout(e)}>
                            Lougout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

export default withRouter(Lougout);