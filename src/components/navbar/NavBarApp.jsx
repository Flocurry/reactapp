import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { object, string } from "prop-types";
import axios from 'axios';

import {
    Collapse,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavBarApp extends Component {

    // On définit le type des proprités du component
    static propTypes = {
        user: object.isRequired,
        gender: string.isRequired,
    }

    // Valeurs des props par défaut
    // Si on oublie les props quand on instancie le composant
    static defaultProps = {
        user: {},
        gender: 'Mr'
    }

    logout(e) {
        e.preventDefault();
        let req = {
            url: 'http://localhost/users/logout',
            method: 'PUT',
            data: this.props.user
        }
        let self = this;
        axios(req).then(response => {
            // On supprime tous les localStorage
            localStorage.clear();
            // Redirection vers le composant login
            self.props.history.push('/login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Collapse navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Admin
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        Users
                                    </DropdownItem>
                                    <DropdownItem>
                                        Roles
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <span className="fa fa-user"></span> {this.props.gender}. {this.props.user.username}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.logout.bind(this)}>
                                        Lougout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavBarApp);