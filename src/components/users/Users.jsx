import React, { Component } from 'react';
import axios from 'axios';
import NavBarApp from '../navbar/NavBarApp';
import Paginator from '../grid/Paginator';
import GridUsers from '../grid/Grid';

class Users extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            users: [],
            pager: {},
            pagedItems: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        let req = {
            url: 'http://localhost/users',
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin'
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            let pager = this.getPager(response.data.length, this.state.currentPage, 5);
            this.setState({
                users: response.data,
                pager: pager,
                pagedItems: response.data.slice(pager.startIndex, pager.endIndex + 1),
                isLoaded: true
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    getPager(totalItems, currentPage = 1, pageSize = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    deleteUser(userId, e) {
        e.preventDefault();
        let req = {
            url: 'http://localhost/users/delete/' + userId,
            method: 'DELETE',
            withCredentials: true,
            credentials: 'same-origin',
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            // On supprime le user du state
            let users = this.state.users.filter(el => el.user_id !== userId);
            let pager = this.getPager(users.length, this.state.currentPage, 5);
            this.setState({
                users: users,
                pager: pager,
                pagedItems: users.slice(pager.startIndex, pager.endIndex + 1),
            });
        }).catch(function (error) {
            console.log(error);
        });

    }

    changePage(page) {
        let pager = this.getPager(this.state.users.length, page, 5);
        this.setState({
            currentPage: page,
            pager: pager,
            pagedItems: this.state.users.slice(pager.startIndex, pager.endIndex + 1),
        });
    }

    render() {
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return (
            <div>
                <NavBarApp />
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default panel-table">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col col-xs-6">
                                            <h3 className="panel-title">Users</h3>
                                        </div>
                                    </div>
                                </div>
                                <GridUsers
                                    users={this.state.pagedItems}
                                    deleteUser={(userId, e) => this.deleteUser(userId, e)} />
                                <div className="panel-footer">
                                    <Paginator
                                        pager={this.state.pager}
                                        changePage={(page, e) => this.changePage(page, e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;