import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
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

    logout(e) {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('userLogged'));
        let req = {
            url: 'http://localhost/users/logout',
            method: 'PUT',
            data: user
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
                                    <span className="fa fa-user"></span> Florian
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