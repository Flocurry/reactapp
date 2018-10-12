// import React, { Component } from 'react';
// import axios from 'axios';
// import { string } from 'prop-types';
// import NavBarApp from '../navbar/NavBarApp';
// import Paginator from '../grid/Paginator';
// import Grid from './Grid';
// import ModalParent from '../modal/ModalParent';

// class ComponentWithGrid extends Component {

//     static propTypes = {
//         componentName: string.isRequired,
//         urlGetDatas: string.isRequired,
//         urlDeleteData: string.isRequired,
//         columnName: string.isRequired
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             currentPage: 1,
//             allDatas: [],
//             pager: {},
//             pagedItems: [],
//             isLoaded: false,
//             isModalOpen: false,
//             titleModal: ''
//         }
//     }

//     componentDidMount() {
//         let req = {
//             url: this.props.urlGetDatas,
//             method: 'GET',
//             withCredentials: true,
//             credentials: 'same-origin'
//         }
//         // Arrow function permet d'avoir le this dans le callBack
//         axios(req).then(response => {
//             let pager = this.getPager(response.data.length, this.state.currentPage, 5);
//             this.setState({
//                 allDatas: response.data,
//                 pager: pager,
//                 pagedItems: response.data.slice(pager.startIndex, pager.endIndex + 1),
//                 isLoaded: true
//             });
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }

//     deleteData(id, e) {
//         e.preventDefault();
//         let req = {
//             url: this.props.urlDeleteData + id,
//             method: 'DELETE',
//             withCredentials: true,
//             credentials: 'same-origin',
//         }
//         // Arrow function permet d'avoir le this dans le callBack
//         axios(req).then(response => {
//             // On supprime le user du state
//             let allDatas = this.filterParams(this.state.allDatas, { 'id': id, 'columName': this.props.columnName });
//             let pager = this.getPager(allDatas.length, this.state.currentPage, 5);
//             this.setState({
//                 allDatas: allDatas,
//                 pager: pager,
//                 pagedItems: allDatas.slice(pager.startIndex, pager.endIndex + 1)
//             });
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }

//     filterParams(allDatas, params) {
//         return allDatas.filter(function (item) {
//             return item[params.columName] !== params.id;
//         });
//     }

//     getPager(totalItems, currentPage = 1, pageSize = 10) {
//         // calculate total pages
//         let totalPages = Math.ceil(totalItems / pageSize);

//         // ensure current page isn't out of range
//         if (currentPage < 1) {
//             currentPage = 1;
//         } else if (currentPage > totalPages) {
//             currentPage = totalPages;
//         }

//         let startPage, endPage;
//         if (totalPages <= 10) {
//             // less than 10 total pages so show all
//             startPage = 1;
//             endPage = totalPages;
//         } else {
//             // more than 10 total pages so calculate start and end pages
//             if (currentPage <= 6) {
//                 startPage = 1;
//                 endPage = 10;
//             } else if (currentPage + 4 >= totalPages) {
//                 startPage = totalPages - 9;
//                 endPage = totalPages;
//             } else {
//                 startPage = currentPage - 5;
//                 endPage = currentPage + 4;
//             }
//         }

//         // calculate start and end item indexes
//         let startIndex = (currentPage - 1) * pageSize;
//         let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//         // create an array of pages to ng-repeat in the pager control
//         let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

//         // return object with all pager properties required by the view
//         return {
//             totalItems: totalItems,
//             currentPage: currentPage,
//             pageSize: pageSize,
//             totalPages: totalPages,
//             startPage: startPage,
//             endPage: endPage,
//             startIndex: startIndex,
//             endIndex: endIndex,
//             pages: pages
//         };
//     }

//     changePage(page) {
//         let pager = this.getPager(this.state.allDatas.length, page, 5);
//         this.setState({
//             currentPage: page,
//             pager: pager,
//             pagedItems: this.state.allDatas.slice(pager.startIndex, pager.endIndex + 1),
//         });
//     }

//     toggleModal() {
//         this.setState({
//             isModalOpen: !this.state.isModalOpen
//         });
//     }

//     showModal(action) {
//         let titleModal = this.state.titleModal;
//         switch (action) {
//             case 'create':
//                 titleModal = 'New role';
//                 break;
//             case 'edit':
//                 titleModal = 'Edit role';
//                 break;
//             default:
//                 return '';
//         }
//         this.setState({
//             isModalOpen: true,
//             titleModal: titleModal
//         });
//     }

//     render() {
//         let createNew = this.props.componentName === 'Roles';
//         if (!this.state.isLoaded) {
//             return (
//                 <div>
//                     Loading...
//                 </div>
//             );
//         }
//         return (
//             <div>
//                 <NavBarApp />
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-10 col-md-offset-1">
//                             <div className="panel panel-default panel-table">
//                                 <div className="panel-heading">
//                                     <div className="row">
//                                         <div className="col col-xs-6">
//                                             <h3 className="panel-title">{this.props.componentName}</h3>
//                                         </div>
//                                         <div hidden={!createNew} className="col col-xs-6 text-right">
//                                             <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#idModal"
//                                                 onClick={() => this.showModal('create')}>
//                                                 Create New
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <Grid
//                                     datas={this.state.pagedItems}
//                                     componentName={this.props.componentName}
//                                     deleteData={(id, e) => this.deleteData(id, e)}
//                                     onShow={(action) => this.showModal(action)} />
//                                 <div className="panel-footer">
//                                     <Paginator
//                                         pager={this.state.pager}
//                                         changePage={(page, e) => this.changePage(page, e)} />
//                                 </div>
//                                 <ModalParent
//                                     title={this.state.titleModal}
//                                     show={this.state.isModalOpen}
//                                     onClose={() => this.toggleModal()} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ComponentWithGrid;