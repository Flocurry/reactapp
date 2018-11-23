import React from 'react';
import ComponentWithGrid from '../grid/ComponentWithGrid';


const urlGetDatas = process.env.REACT_APP_API_REST_URL + '/roles';
const urlDeleteData = process.env.REACT_APP_API_REST_URL + '/roles/delete/';
const primaryKey = 'role_id';
const titleDeleteDialog = 'Suppression role';
const contentDialog = 'Êtes-vous sûr de vouloir supprimer le rôle ';
const columnDeleteDialogMessage = 'libelle';

// Stateless component
const Roles = () =>
    (
        <ComponentWithGrid
            urlGetDatas={urlGetDatas}
            urlDeleteData={urlDeleteData}
            primaryKey={primaryKey}
            titleDeleteDialog={titleDeleteDialog}
            contentDialog={contentDialog}
            columnDeleteDialogMessage={columnDeleteDialogMessage} />
    )

export default Roles;