import React, { Component } from 'react';
import { array } from 'prop-types';
import axios from 'axios';

class Grid extends Component {

    static propTypes = {
        users: array.isRequired
    }

    static defaultProps = {
        users: []
    }

    deleteUser(userId, e) {
        e.preventDefault();
        this.props.deleteUser(userId, e);
    }

    render() {
        return (
            <div className="panel-body">
                <div>
                    <table className="table table-striped table-bordered table-list">
                        <thead>
                            <tr>
                                <th>
                                    <em className="fa fa-cog"></em>
                                </th>
                                <th>Image</th>
                                <th>Firstname</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user, index) => {
                                return ([
                                    <tr key={index}>
                                        <td align="center">
                                            <button className="btn btn-danger"
                                                hidden={user.is_connected}
                                                onClick={(e) => this.deleteUser(user.user_id, e)}>
                                                <em className="fa fa-trash"></em>
                                            </button>
                                        </td>
                                        <td><img src={user.image} alt={user.image} /></td>
                                        <td>
                                            {user.firstname}
                                        </td>
                                        <td>
                                            {user.lastname}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.libelle}
                                        </td>
                                    </tr>
                                ])
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Grid;