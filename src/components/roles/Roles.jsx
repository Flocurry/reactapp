import React, { Component } from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';

class Roles extends Component {
    render() {
        return (
            <div>
                <ComponentWithGrid
                    componentName='Roles'
                    urlGetDatas='http://localhost/roles'
                    urlDeleteData='http://localhost/roles/delete/'
                    columnName='role_id' />
            </div>
        );
    }
}

export default Roles;