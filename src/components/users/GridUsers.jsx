import React, { Component } from 'react';
import { array, object } from 'prop-types';
import ReactDataGrid from 'react-data-grid';


const cols = [{ key: 'id', name: 'ID', resizable: true}, { key: 'title', name: 'Title', resizable: true }];
const rows = [{ id: 1, title: 'Title 1' }];
class GridUsers extends Component {

    static propTypes = {
        datas: array.isRequired,
        columns: array.isRequired
    }

    static defaultProps = {
        datas: [],
        columns: []
    }

    render() {
        let columns = cols;
        let datas = rows;
        console.log(columns);
        console.log(datas);
        
        let rowGetter = rowNumber => datas[rowNumber]
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={rowGetter}
                rowsCount={datas.length}
                minHeight={500}/>

            // <div className="panel-body">
            //     <div>
            //         <table className="table table-striped table-bordered table-list">
            //             <thead>
            //                 <tr>
            //                     <th>
            //                         <em className="fa fa-cog"></em>
            //                     </th>
            //                     <th>Image</th>
            //                     <th>Firstname</th>
            //                     <th>LastName</th>
            //                     <th>Email</th>
            //                     <th>Role</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {this.props.datas.map((user, index) => {
            //                     return ([
            //                         <tr key={index}>
            //                             <td align="center">
            //                                 <button className="btn btn-danger"
            //                                     hidden={user.is_connected}
            //                                     onClick={(e) => this.props.deleteUser(user.user_id, e)}>
            //                                     <em className="fa fa-trash"></em>
            //                                 </button>
            //                             </td>
            //                             <td><img src={user.image} alt={user.image} /></td>
            //                             <td>
            //                                 {user.firstname}
            //                             </td>
            //                             <td>
            //                                 {user.lastname}
            //                             </td>
            //                             <td>
            //                                 {user.email}
            //                             </td>
            //                             <td>
            //                                 {user.libelle}
            //                             </td>
            //                         </tr>
            //                     ])
            //                 })}
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
        );
    }
}

export default GridUsers;