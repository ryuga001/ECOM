import { FaCartShopping } from 'react-icons/fa6';
import { removeProduct } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
export interface ProductType {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imgUrl: string,

}

// let columns: Column<ProductType>[] = [
//     {
//         Header: "ID",
//         accessor: "id",
//     },

//     {
//         Header: "Name",
//         accessor: "name",
//     },
//     {
//         Header: "Quantity",
//         accessor: "quantity",
//     },
//     {
//         Header: "Price",
//         accessor: "price",
//     }
// ]
const Cart = () => {
    const cartProduct = useAppSelector(state => state.cart.cartProduct);
    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    //     columns, data: cartProduct,
    // }, useSortBy,
    // )

    const dispatch = useAppDispatch();
    const priceCalculate = () => {
        let total = 0;

        cartProduct.forEach((item: ProductType) => {
            total += item.price * item.quantity;
            console.log(item.imgUrl);
        })
        return total;
    }
    const RemoveFromCart = (id: string) => {
        dispatch(removeProduct(id));
    }
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <div className="CartContainer">
                {/* <table {...getTableProps()}>
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
                </table> */}
                <div>

                    < FaCartShopping size={60} color='gray' />
                </div>

                <table>
                    {
                        cartProduct.length > 0 ?
                            <>
                                <thead>
                                    <tr>
                                        <th></th>

                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartProduct.map((item, index) =>
                                        (

                                            <tr key={index}>
                                                <td>
                                                    <img src={item.imgUrl} />
                                                </td>

                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>Rs.{item.price}/-</td>
                                                <td>
                                                    <button onClick={() => RemoveFromCart(item.id)
                                                    }>X</button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                                <tfoot>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <th>
                                            Total Amount :
                                        </th>
                                        <td>
                                            {/* < hr /> */}
                                            Rs.{priceCalculate()
                                            }/-</td>
                                    </tr>
                                </tfoot>
                            </>

                            : <>

                                <span>
                                    <p>
                                        Cart is Empty
                                    </p>

                                </span>
                            </>
                    }
                </table>

                {
                    cartProduct.length > 0 &&
                    <div>
                        <button onClick={() => navigate("/place_order")} >Place Order</button>
                    </div>
                }
            </div >
        </>
    )
}

export default Cart