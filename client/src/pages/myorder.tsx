import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa"
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"

interface OrderItemType {
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    product: string,

}
interface paymentInfoType {
    id: string,
    status: string,
}
interface OrderDataType {
    id: string,
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: number,
    phoneNo: number,
    orderedItems: Array<OrderItemType>,
    user: string,
    paymentInfo: paymentInfoType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: string,
}
const MyOrder = () => {
    const [orders, setOrders] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/order/orders/me")
            // console.log(res.data.orders);
            setOrders(res.data.orders)
        }
        fetchData();
    }, [])
    const navigate = useNavigate();
    const itemsPerPage = 13;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const renderPageButtons = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button key={i} style={{ backgroundColor: currentPage === i ? "lightblue" : "" }
                } onClick={() => setCurrentPage(i)} > {i + 1}</button >
            );
        }
        return pages;
    };
    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return orders.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index}>
                <td>{item._id}</td>
                <td>{item.shippingInfo.state},{item.shippingInfo.country}</td>
                <td>{item.totalPrice}</td>
                <td>{item.orderStatus}</td>
            </tr>
        ));
    };
    return (
        <div className="MyOrderContainer">
            <div><FaHome style={{ cursor: "pointer", margin: "1rem" }} onClick={() => navigate("/")} size={25} color="gray" /></div>
            <main>
                <h2><FaBagShopping size={30} color="gray" /></h2>
                <table className='TableStyle'>
                    <thead>
                        <th>Id</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            renderTableData()
                        }
                    </tbody>
                    <tfoot>
                        <div>
                            {totalPages > 1 && renderPageButtons()}
                        </div>
                    </tfoot>
                </table>
            </main>
        </div>
    )
}

export default MyOrder