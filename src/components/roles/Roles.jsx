import React, { Component } from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';

class Roles extends Component {
    render() {
        let urlGetDatas = process.env.REACT_APP_API_REST_URL + '/roles';
        let urlDeleteData = process.env.REACT_APP_API_REST_URL + '/roles/delete';
        return (
            <div>
                <ComponentWithGrid
                    componentName='Roles'
                    urlGetDatas={urlGetDatas}
                    urlDeleteData={urlDeleteData}
                    columnName='role_id' />
            </div>
        );
    }
}

export default Roles;