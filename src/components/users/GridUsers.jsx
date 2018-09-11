import React, { Component } from 'react';
import { array } from 'prop-types';

class GridUsers extends Component {

    static propTypes = {
        datas: array.isRequired
    }

    static defaultProps = {
        datas: []
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
                            {this.props.datas.map((user, index) => {
                                return ([
                                    <tr key={index}>
                                        <td align="center">
                                            <button className="btn btn-danger"
                                                hidden={user.is_connected}
                                                onClick={(e) => this.props.deleteUser(user.user_id, e)}>
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

export default GridUsers;