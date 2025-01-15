import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import SideBar from './components/sidebar';
import { getAdminOrders } from '../route';

const AdminOrder = () => {
    const [orders, setOrders] = useState<Array<any>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAdminOrders();
            if (res)
                setOrders(res.orders);
        };
        fetchData();
    }, []);

    const itemsPerPage = 13;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return orders.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{item._id}</td>
                <td className="py-3 px-4">{item.shippingInfo.state}, {item.shippingInfo.country}</td>
                <td className="py-3 px-4 font-semibold text-green-600">₹{item.totalPrice}</td>
                <td className="py-3 px-4 capitalize">{item.orderStatus}</td>
            </tr>
        ));
    };

    return (
        <div className="flex">

            <SideBar />

            <main className="flex-1 p-6">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Shipping Address</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableData()}</tbody>
                    </table>
                    <div className="flex justify-between items-center p-4">
                        {totalPages > 1 && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300">
                                    <HiArrowLeft />
                                </button>
                                <button
                                    onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1}
                                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300">
                                    <HiArrowRight />
                                </button>
                            </div>
                        )}
                        <div className="text-sm text-gray-600">
                            Page {currentPage + 1} of {totalPages}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminOrder;
