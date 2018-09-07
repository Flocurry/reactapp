import React, { Component } from 'react';
import { object } from 'prop-types';

class Paginator extends Component {

    static propTypes = {
        pager: object.isRequired
    }

    static defaultProps = {
        pager: {}
    }

    render() {
        return (
            <div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col col-xs-4">Page {this.props.pager.currentPage} of {this.props.pager.totalPages}
                        </div>
                        <nav aria-label="Page navigation example">
                            <div className="col col-xs-6 text-right">
                                <ul className="pagination">
                                    <li className={"page-item " + ((this.props.pager.currentPage == 1) ? 'disabled' : '')}>
                                        <a className="page-link"
                                            onClick={(e) => this.props.changePage(this.props.pager.currentPage - 1, e)}>Previous</a>
                                    </li>
                                    {Object.keys(this.props.pager.pages).map((index) => {
                                        let numPage = this.props.pager.pages[index];
                                        return ([
                                            <div key={index}>
                                                <li className={"page-item " + ((this.props.pager.currentPage == numPage) ? 'active' : '')}>
                                                    <a className="page-link"
                                                        onClick={(e) => this.props.changePage(numPage, e)}>{numPage}</a>
                                                </li>
                                            </div>
                                        ])
                                    })}
                                    <li className={"page-item " + ((this.props.pager.currentPage == this.props.pager.totalPages) ? 'disabled' : '')}>
                                        <a className="page-link"
                                            onClick={(e) => this.props.changePage(this.props.pager.currentPage + 1, e)}>Next</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Paginator;