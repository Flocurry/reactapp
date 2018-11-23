import React from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';

const urlGetDatas = process.env.REACT_APP_API_REST_URL + '/users';
const urlDeleteData = process.env.REACT_APP_API_REST_URL + '/users/delete/';
const primaryKey = 'user_id';
const titleDeleteDialog = 'Suppression user';
const contentDialog = 'Êtes-vous sûr de vouloir supprimer le user ';
const columnDeleteDialogMessage = 'username';

// Stateless component
const Users = () =>
    (
        <ComponentWithGrid
            urlGetDatas={urlGetDatas}
            urlDeleteData={urlDeleteData}
            primaryKey={primaryKey}
            titleDeleteDialog={titleDeleteDialog}
            contentDialog={contentDialog}
            columnDeleteDialogMessage={columnDeleteDialogMessage} />
    )

export default Users;