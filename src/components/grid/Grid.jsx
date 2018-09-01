import React, { Component } from 'react';
import { array } from 'prop-types';

class Grid extends Component {

    static propTypes = {
        users: array.isRequired
    }

    static defaultProps = {
        users: []
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
                                            <button className="btn btn-danger">
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