import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState,
    PagingState,
    EditingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    SearchState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    TableSelection,
    PagingPanel,
    TableFilterRow,
    ColumnChooser,
    TableColumnVisibility,
    Toolbar,
    TableColumnReordering,
    DragDropProvider,
    TableColumnResizing,
    SearchPanel
} from '@devexpress/dx-react-grid-material-ui';
import ResponsiveDialog from '../modal/ResponsiveDialog';

export default class DevExpressReactGrid extends React.PureComponent {
    static propTypes = {
        // Booleans
        canSelectRows: PropTypes.bool.isRequired,
        canSearch: PropTypes.bool.isRequired,
        canSort: PropTypes.bool.isRequired,
        canFilter: PropTypes.bool.isRequired,
        canHideColumn: PropTypes.bool.isRequired,
        canReorderColumn: PropTypes.bool.isRequired,
        canResizeColumn: PropTypes.bool.isRequired,
        openDialog: PropTypes.bool.isRequired,
        // String
        titleDialog: PropTypes.string.isRequired,
        contentDialog: PropTypes.string.isRequired,
        // Arrays
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
        columnsHidden: PropTypes.array.isRequired,
        columnsSorting: PropTypes.array.isRequired,
        columnsFilters: PropTypes.array.isRequired,
        columnsOrder: PropTypes.array.isRequired,
        columnsWidths: PropTypes.array.isRequired,
        selection: PropTypes.array.isRequired,
        // M�hodes
        handleCloseDialog: PropTypes.func.isRequired,
        handleYesDialog: PropTypes.func.isRequired,
        commitChanges: PropTypes.func.isRequired,
        changeColumnWidths: PropTypes.func.isRequired,
        hiddenColumnNamesChange: PropTypes.func.isRequired,
        changeSorting: PropTypes.func.isRequired,
        changeFilters: PropTypes.func.isRequired,
        changeSelection: PropTypes.func.isRequired,
        changeColumnOrder: PropTypes.func.isRequired,
        getRowId: PropTypes.func.isRequired,
        getCellValue: PropTypes.func.isRequired
    }

    render() {
        // Select rows
        let selectRows = null;
        // Search variables
        let searchPanel = null;
        let searchState = null;
        // Sorting variables
        let sortingState = null;
        // Filter variables
        let tableFilterRow;
        let filterState;
        // Column chooser
        let columnChooser;
        // Reordering columns
        let dragAndDrop;
        let tableColumnReordering;
        // Resizing columns
        let tableColumnResizing;

        if(this.props.canSelectRows){
            selectRows = <TableSelection showSelectAll />;
        }
        if (this.props.canSearch) {
            searchPanel = <SearchPanel />;
            searchState = <SearchState
                onValueChange={this.props.changeSearchValue} />;
        }
        if (this.props.canSort) {
            sortingState = <SortingState
                sorting={this.props.columnsSorting}
                onSortingChange={this.props.changeSorting} />
        }
        if (this.props.canFilter) {
            filterState = <FilteringState
                filters={this.props.columnsFilters}
                onFiltersChange={this.props.changeFilters} />;
            tableFilterRow = <TableFilterRow />;
        }
        if (this.props.canHideColumn) {
            columnChooser = <ColumnChooser />;
        }
        if (this.props.canReorderColumn) {
            dragAndDrop = <DragDropProvider />;
            tableColumnReordering = <TableColumnReordering
                order={this.props.columnsOrder}
                onOrderChange={this.props.changeColumnOrder} />;
        }
        if (this.props.canResizeColumn) {
            tableColumnResizing = <TableColumnResizing
                columnWidths={this.props.columnsWidths}
                onColumnWidthsChange={this.props.changeColumnWidths} />;
        }

        return (
            
            <div>
                <span>
                    Total rows selected:
                    {' '}
                    {this.props.selection.length}
                </span>
                <Paper>
                    <Grid
                        rows={this.props.rows}
                        columns={this.props.columns}
                        getRowId={this.props.getRowId}
                        getCellValue={this.props.getCellValue}>
                        {searchState}
                        <EditingState
                            editingRowIds={this.props.editingRowIds}
                            onEditingRowIdsChange={this.changeEditingRowIds}
                            rowChanges={this.props.rowChanges}
                            // onRowChangesChange={this.changeRowChanges}
                            // addedRows={addedRows}
                            // onAddedRowsChange={this.changeAddedRows}
                            onCommitChanges={this.props.commitChanges}
                        />
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={6} />
                        <SelectionState
                            selection={this.props.selection}
                            onSelectionChange={this.props.changeSelection} />
                        <IntegratedPaging />
                        <IntegratedSelection />
                        {sortingState}
                        <IntegratedSorting />
                        {filterState}
                        <IntegratedFiltering />
                        {dragAndDrop}
                        <Table />
                        {tableColumnResizing}
                        {tableColumnReordering}
                        <TableHeaderRow showSortingControls />
                        <TableEditRow />
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand />
                        <TableColumnVisibility
                            hiddenColumnNames={this.props.columnsHidden}
                            onHiddenColumnNamesChange={this.props.hiddenColumnNamesChange} />
                        <Toolbar />
                        {searchPanel}
                        {columnChooser}
                        {tableFilterRow}
                        {selectRows}
                        <PagingPanel />
                    </Grid>
                    <ResponsiveDialog
                        open={this.props.openDialog}
                        title={this.props.titleDialog}
                        content={this.props.contentDialog}
                        handleClose={this.props.handleCloseDialog}
                        handleYes={this.props.handleYesDialog}/>
                </Paper>
            </div>
        );
    }
}
