import React, { Component } from 'react';
import { array, string } from 'prop-types';
import GridUsers from '../users/GridUsers';
import GridRoles from '../roles/GridRoles';

class Grid extends Component {

    static propTypes = {
        datas: array.isRequired,
        componentName: string.isRequired
    }

    renderGrid() {
        switch (this.props.componentName) {
            case 'Users':
                return <GridUsers
                    datas={this.props.datas}
                    componentName={this.props.componentName}
                    deleteUser={(id, e) => this.props.deleteData(id, e)} />;
            case 'Roles':
                return <GridRoles
                    datas={this.props.datas}
                    componentName={this.props.componentName}
                    deleteRole={(id, e) => this.props.deleteData(id, e)} />;
            default:
                return null;
        }
    }

    render() {
        return this.renderGrid()
    }
}

export default Grid;