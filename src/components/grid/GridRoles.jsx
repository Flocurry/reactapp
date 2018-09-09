import React, { Component } from 'react';
import { array } from 'prop-types';

class GridRoles extends Component {

    static propTypes = {
        roles: array.isRequired
    }

    static defaultProps = {
        roles: []
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
                                <th>Libellé</th>
                                <th>Date creation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.roles.map((role, index) => {
                                return ([
                                    <tr key={index}>
                                        <td align="center">
                                            <button className="btn btn-danger"
                                                onClick={(e) => this.props.deleteDatas(role.role_id, e)}>
                                                <em className="fa fa-trash"></em>
                                            </button>
                                        </td>
                                        <td>
                                            {role.libelle}
                                        </td>
                                        <td>
                                            {role.date_creation}
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

export default GridRoles;