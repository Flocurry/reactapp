import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBarBtn extends Component {
    render() {
        return (
            <div className="container-fluid bg-light py-3">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="btn btn-outline-secondary"><NavLink to={'/login'}>Login</NavLink></div>&nbsp;
                            <div className="btn btn-outline-secondary"><NavLink to={'/register'}>Register</NavLink></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBarBtn;