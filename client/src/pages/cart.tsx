import { useTable } from "react-table";
import { useAppSelector } from "../store/hook"
export interface ProductType {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imgUrl: string,
}

let columns: Column<ProductType>[] = [
    {
        Header: "ID",
        accessor: "id",
    },

    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Price",
        accessor: "price",
    }
]
const Cart = () => {
    const cartProduct = useAppSelector(state => state.cartProduct);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns, data: cartProduct,
    })
    return (
        <div className="CartContainer">
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((hg) => (
                            <tr {...hg.getHeaderGroupProps()} >
                                {
                                    hg.headers.map((header) => (
                                        <th {...header.getHeaderProps()} >{header.render("Header")}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Cart