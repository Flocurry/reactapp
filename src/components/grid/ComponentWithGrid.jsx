import React, { Component } from 'react';
import axios from 'axios';
import { string } from 'prop-types';
// import NavBarApp from '../navbar/NavBarApp';
// import Paginator from '../grid/Paginator';
// import Grid from './Grid';
// import ModalParent from '../modal/ModalParent';
import GridTest from './GridTest';

class ComponentWithGrid extends Component {

    static propTypes = {
        componentName: string.isRequired,
        urlGetDatas: string.isRequired,
        urlDeleteData: string.isRequired,
        columnName: string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            allDatas: [],
            columns: [],
            columnsHidden: [],
            columnsSorting: [],
            columnsFilters: [],
            columnsOrder: [],
            columnsWidths: [],
            pager: {},
            pagedItems: [],
            isLoaded: false,
            isModalOpen: false,
            titleModal: ''
        }
    }

    componentDidMount() {
        let req = {
            url: this.props.urlGetDatas,
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            this.setState({
                allDatas: response.data.datas,
                columns: response.data.columns,
                columnsHidden: response.data.columnsHidden,
                columnsSorting: response.data.columnsSorting,
                columnsFilters: response.data.columnsFilters,
                columnsOrder: response.data.columnsOrder,
                columnsWidths: response.data.columnsWidths,
                isLoaded: true
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    // deleteData(id, e) {
    //     e.preventDefault();
    //     let req = {
    //         url: this.props.urlDeleteData + id,
    //         method: 'DELETE',
    //         withCredentials: true,
    //         credentials: 'same-origin',
    //     }
    //     // Arrow function permet d'avoir le this dans le callBack
    //     axios(req).then(response => {
    //         // On supprime le user du state
    //         let allDatas = this.filterParams(this.state.allDatas, { 'id': id, 'columName': this.props.columnName });
    //         let pager = this.getPager(allDatas.length, this.state.currentPage, 5);
    //         this.setState({
    //             allDatas: allDatas,
    //             pager: pager,
    //             pagedItems: allDatas.slice(pager.startIndex, pager.endIndex + 1)
    //         });
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }

    // toggleModal() {
    //     this.setState({
    //         isModalOpen: !this.state.isModalOpen
    //     });
    // }

    // showModal(action) {
    //     let titleModal = this.state.titleModal;
    //     switch (action) {
    //         case 'create':
    //             titleModal = 'New role';
    //             break;
    //         case 'edit':
    //             titleModal = 'Edit role';
    //             break;
    //         default:
    //             return '';
    //     }
    //     this.setState({
    //         isModalOpen: true,
    //         titleModal: titleModal
    //     });
    // }

    render() {
        // let createNew = this.props.componentName === 'Roles';
        if (!this.state.isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default panel-table">
                                {/* <div className="panel-heading">
                                    <div className="row">
                                        <div hidden={!createNew} className="col col-xs-6 text-right">
                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#idModal"
                                                onClick={() => this.showModal('create')}>
                                                Create New
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <Grid
                                    datas={this.state.pagedItems}
                                    columns={this.state.columns}
                                    componentName={this.props.componentName}
                                    deleteData={(id, e) => this.deleteData(id, e)}
                                    onShow={(action) => this.showModal(action)} /> */}
                                <GridTest
                                    columns={this.state.columns}
                                    columnsHidden={this.state.columnsHidden}
                                    columnsSorting={this.state.columnsSorting}
                                    columnsFilters={this.state.columnsFilters}
                                    columnsOrder={this.state.columnsOrder}
                                    columnsWidths={this.state.columnsWidths}
                                    rows={this.state.allDatas}
                                    canSearch={true}
                                    canSort={true}
                                    canFilter={true}
                                    canHideColumn={true}
                                    canReorderColumn={true}
                                    canResizeColumn={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComponentWithGrid;