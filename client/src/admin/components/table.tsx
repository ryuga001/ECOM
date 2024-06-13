import { Column, useTable } from 'react-table';

interface TableComponentProps<T extends object> {
    columns: Column<T>[];
    data: T[];
}

const TableComponent = <T extends object>({ columns, data }: TableComponentProps<T>) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="table-row header">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="table-header">
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className="table-row">
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} className="table-cell" data-label={cell.column.Header}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableComponent;
