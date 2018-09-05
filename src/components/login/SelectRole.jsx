import React, { Component } from 'react';
import { array } from 'prop-types';

class SelectRole extends Component {

    static propTypes = {
        datas: array.isRequired
    }

    static defaultProps = {
        datas: []
    }

    changeHandler(fieldName) {
        this.props.onChangeRole(fieldName, document.getElementById('selectRole').value);
    }

    render() {
        return (
            <div className="form-group row">
                <div className="input-group offset-sm-2 col-sm-8">
                    <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-user-circle text-info"></i></div>
                    </div>
                    <select id="selectRole"
                        onChange={() => this.changeHandler('role_id')} className="form-control input-lg">
                        {this.props.datas.map((role, index) => {
                            return ([
                                <option key={role.role_id} value={role.role_id}>
                                    {role.libelle}
                                </option>
                            ])
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

export default SelectRole;