import React, { Component } from 'react';
import { array, string } from 'prop-types';
import GridUsers from './GridUsers';
import GridRoles from './GridRoles';

class Grid extends Component {

    static propTypes = {
        datas: array.isRequired,
        componentName: string.isRequired
    }

    render() {
        if (this.props.componentName === 'Users') {
            return (
                <div>
                    <GridUsers
                        datas={this.props.datas}
                        componentName={this.props.componentName}
                        deleteData={(id, e) => this.props.deleteData(id, e)} />
                </div>
            );
        }
        if (this.props.componentName === 'Roles') {
            return (
                <div>
                    <GridRoles
                        datas={this.props.datas}
                        componentName={this.props.componentName}
                        deleteData={(id, e) => this.props.deleteData(id, e)} />
                </div>
            );
        }
    }
}

export default Grid;