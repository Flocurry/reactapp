import React, { Component } from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';

class Users extends Component {
    render() {
        let urlGetDatas = process.env.REACT_APP_API_REST_URL + '/users';
        let urlDeleteData = process.env.REACT_APP_API_REST_URL + '/users/delete';
        return (
            <div>
                <ComponentWithGrid
                    componentName='Users'
                    urlGetDatas={urlGetDatas}
                    urlDeleteData={urlDeleteData}
                    columnName='user_id' />
            </div>
        );
    }
}

export default Users;