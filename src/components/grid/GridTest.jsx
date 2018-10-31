import * as React from 'react';
import { bool, array } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState,
    PagingState,
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

// import { generateRows } from '../../../demo-data/generator';

export default class GridTest extends React.PureComponent {
    static propTypes = {
        columns: array.isRequired,
        columnsHidden: array.isRequired,
        columnsSorting: array.isRequired,
        columnsFilters: array.isRequired,
        columnsOrder: array.isRequired,
        columnsWidths: array.isRequired,
        rows: array.isRequired,
        canSearch: bool.isRequired,
        canSort: bool.isRequired,
        canFilter: bool.isRequired,
        canHideColumn: bool.isRequired,
        canReorderColumn: bool.isRequired,
        canResizeColumn: bool.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            // De la forme [{ name: 'colA', title: 'Titre colonne' },...]
            columns: props.columns,
            // De la forme [{ colA: 'value A', colB: 'Value B' },...]
            rows: props.rows,
            // De la forme ['colA','colB',...]
            columnHidden: props.columnsHidden,
            // De la forme [{ columnName: 'colA', direction: 'asc' },...]
            columnsSorting: props.columnsSorting,
            // De la forme [{ columnName: 'colA', value: '' },...]
            columnsFilters: props.columnsFilters,
            // De la forme ['colA', 'colB',...]
            columnsOrder: props.columnsOrder,
            // De la forme [{ columnName: 'colA', width: 180 },...] 
            columnsWidths: props.columnsWidths,
            selection: [],

        };
    }

    changeColumnWidths = (columnsWidths) => {
        this.setState({
            columnsWidths
        });
    }

    hiddenColumnNamesChange = (columnHidden) => {
        this.setState({
            columnHidden
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

    changeColumnOrder = (newOrder) => {
        this.setState({
            columnsOrder: newOrder
        });
    }

    render() {
        let searchPanel = null;
        // Search variables
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

        if (this.props.canSearch) {
            searchPanel = <SearchPanel />;
            searchState = <SearchState
                onValueChange={this.changeSearchValue} />;
        }
        if (this.props.canSort) {
            sortingState = <SortingState
                sorting={this.state.columnsSorting}
                onSortingChange={this.changeSorting} />
        }
        if (this.props.canFilter) {
            filterState = <FilteringState
                filters={this.state.columnsFilters}
                onFiltersChange={this.changeFilters} />;
            tableFilterRow = <TableFilterRow />;
        }
        if (this.props.canHideColumn) {
            columnChooser = <ColumnChooser />;
        }
        if (this.props.canReorderColumn) {
            dragAndDrop = <DragDropProvider />;
            tableColumnReordering = <TableColumnReordering
                order={this.state.columnsOrder}
                onOrderChange={this.changeColumnOrder} />;
        }
        if (this.props.canResizeColumn) {
            tableColumnResizing = <TableColumnResizing
                columnWidths={this.state.columnsWidths}
                onColumnWidthsChange={this.changeColumnWidths} />;
        }
        return (
            <div>
                <span>
                    Total rows selected:
                    {' '}
                    {this.state.selection.length}
                </span>
                <Paper>
                    <Grid
                        rows={this.state.rows}
                        columns={this.state.columns}>
                        {searchState}
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={6} />
                        <SelectionState
                            selection={this.state.selection}
                            onSelectionChange={this.changeSelection} />
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
                        <TableColumnVisibility
                            hiddenColumnNames={this.state.columnHidden}
                            onHiddenColumnNamesChange={this.hiddenColumnNamesChange} />
                        <Toolbar />
                        {searchPanel}
                        {columnChooser}
                        {tableFilterRow}
                        <TableSelection showSelectAll />
                        <PagingPanel />
                    </Grid>
                </Paper>
            </div>
        );
    }
}
