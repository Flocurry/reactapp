import React, { Component } from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';

class Users extends Component {
    render() {
        return (
            <div>
                <ComponentWithGrid
                    componentName='Users'
                    urlGetDatas='http://localhost/users'
                    urlDeleteData='http://localhost/users/delete/'
                    columnName='user_id' />
            </div>
        );
    }
}

export default Users;