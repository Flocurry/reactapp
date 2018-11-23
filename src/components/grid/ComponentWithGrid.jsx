import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DevExpressReactGrid from './DevExpressReactGrid';

class ComponentWithGrid extends React.PureComponent {

    static propTypes = {
        urlGetDatas: PropTypes.string.isRequired,
        urlDeleteData: PropTypes.string.isRequired,
        primaryKey: PropTypes.string.isRequired,
        titleDeleteDialog: PropTypes.string.isRequired,
        contentDialog: PropTypes.string.isRequired,
        columnDeleteDialogMessage: PropTypes.string.isRequired
    }

    state = {
        allDatas: [],
        columns: [],
        columnsHidden: [],
        columnsSorting: [],
        columnsFilters: [],
        columnsOrder: [],
        columnsWidths: [],
        isGridLoaded: false,
        openDialog: false,
        titleDialog: '',
        contentDialog: '',
        selection: [],
        editingRowIds: [],
        addedRows: [],
        rowChanges: {},
        yesDialog: '',
        idDeleteSelected: null
    }

    getRowId = (row) => {
        let primaryKey = this.props.primaryKey;
        return row[primaryKey];
    };

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
                isGridLoaded: true
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteData = (id) => {
        let req = {
            url: this.props.urlDeleteData + id,
            method: 'DELETE',
            withCredentials: true,
            credentials: 'same-origin',
        }
        // Arrow function permet d'avoir le this dans le callBack
        axios(req).then(response => {
            // On supprime le user du state
            let allDatas = this.filterParams(this.state.allDatas, id);
            this.setState({
                allDatas: allDatas
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    filterParams = (allDatas, params) => {
        let primaryKey = this.props.primaryKey;
        return allDatas.filter(item => {
            return item[primaryKey] !== params;
        });
    }

    getRowId = (row) => {
        return row[this.props.primaryKey];
    }

    changeColumnWidths = (columnsWidths) => {
        this.setState({
            columnsWidths
        });
    }

    hiddenColumnNamesChange = (columnsHidden) => {
        this.setState({
            columnsHidden
        });
    }

    changeSorting = (columnsSorting) => {
        this.setState({
            columnsSorting
        });
    }

    changeFilters = (columnsFilters) => {
        this.setState({
            columnsFilters
        });
    }

    changeSelection = (selection) => {
        this.setState({
            selection
        });
    }

    changeColumnOrder = (columnsOrder) => {
        this.setState({
            columnsOrder
        });
    }

    commitChanges = ({ added, changed, deleted }) => {
        let { primaryKey, titleDeleteDialog, contentDialog, columnDeleteDialogMessage } = this.props;
        let { allDatas } = this.state;
        let rowDeleted;
        if (deleted) {
            const deletedSet = new Set(deleted);
            rowDeleted = allDatas.filter(row => deletedSet.has(row[primaryKey]));
            this.setState({
                openDialog: true,
                titleDialog: titleDeleteDialog,
                contentDialog: contentDialog + rowDeleted[0][columnDeleteDialogMessage] + '?',
                yesDialog: 'handleDelete',
                idDeleteSelected: rowDeleted[0][primaryKey]
            });
        }
    }

    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    }

    handleYesDialog = () => {
        switch (this.state.yesDialog) {
            case 'handleDelete':
                this.setState({
                    openDialog: false
                });
                this.deleteData(this.state.idDeleteSelected);
                break;
            default:
                break;
        }
    }

    render() {
        const viewLoading = <div>Loading...</div>;
        const viewGrid = <DevExpressReactGrid
            canSearch={true}
            canSort={true}
            canFilter={true}
            canHideColumn={true}
            canReorderColumn={true}
            canResizeColumn={true}
            columns={this.state.columns}
            rows={this.state.allDatas}
            columnsHidden={this.state.columnsHidden}
            columnsSorting={this.state.columnsSorting}
            columnsFilters={this.state.columnsFilters}
            columnsOrder={this.state.columnsOrder}
            columnsWidths={this.state.columnsWidths}
            selection={this.state.selection}
            openDialog={this.state.openDialog}
            titleDialog={this.state.titleDialog}
            contentDialog={this.state.contentDialog}
            handleCloseDialog={this.handleCloseDialog}
            handleYesDialog={this.handleYesDialog}
            commitChanges={this.commitChanges}
            changeColumnWidths={this.changeColumnWidths}
            hiddenColumnNamesChange={this.hiddenColumnNamesChange}
            changeSorting={this.changeSorting}
            changeFilters={this.changeFilters}
            changeSelection={this.changeSelection}
            changeColumnOrder={this.changeColumnOrder}
            getRowId={this.getRowId} />;

        return (!this.state.isGridLoaded ? viewLoading : viewGrid);
    }
}

export default ComponentWithGrid;