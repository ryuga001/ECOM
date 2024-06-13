import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import SideBar from './components/sidebar';
import DataGridDemo from './components/table';

const AdminOrder = () => {
    const [orders, setOrders] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/order/admin/orders");
            // console.log(res.data);
            setOrders(res.data.orders);
        }
        fetchData();
    }, [])
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
        <>
            <div className="AdminContainer">
                <aside>
                    <SideBar />
                </aside>
                <main>
                    <h2>Orders</h2>
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
                            {totalPages > 1 && <div className='PaginationBox2'>
                                <button onClick={() => {
                                    if (currentPage > 0) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }} disabled={currentPage === 0}><HiArrowLeft /></button>
                                {/* {CurrentPage > 2 && "..."} */}
                                {/* <button >{CurrentPage}</button> */}
                                {/* {CurrentPage < totalPages - 2 && "..."} */}
                                <button onClick={() => {
                                    if (currentPage < totalPages - 1) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }} disabled={currentPage === totalPages - 1}><HiArrowRight /></button>
                            </div>}
                        </tfoot>
                    </table>
                </main>

            </div>

        </>
    )
}

export default AdminOrder