import { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import NavBar from "../components/navbar";
import { getMyOrders } from "../route";

const MyOrder = () => {
    const [orders, setOrders] = useState<Array<any>>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(orders?.length / itemsPerPage) || 0;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMyOrders();
                console.log(res);
                if (res)
                    setOrders(res?.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            }
        };
        fetchData();
    }, []);

    const renderPageButtons = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 m-1 rounded ${currentPage === i
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-all`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    };

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return orders.slice(startIndex, endIndex).map((item: any, index: number) => (
            <tr
                key={item._id || index} // Fallback to index if `_id` is not available
                className="border-b hover:bg-gray-50 transition-colors"
            >
                <td className="px-4 py-3">{item._id || "N/A"}</td>
                <td className="px-4 py-3">
                    {item.shippingInfo?.state || "N/A"}, {item.shippingInfo?.country || "N/A"}
                </td>
                <td className="px-4 py-3">${item.totalPrice?.toFixed(2) || "0.00"}</td>
                <td
                    className={`px-4 py-3 font-medium ${item.orderStatus === "Delivered" ? "text-green-600" : "text-orange-600"
                        }`}
                >
                    {item.orderStatus || "Pending"}
                </td>
            </tr>
        ));
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
                <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <header className="flex items-center justify-between px-6 py-4 bg-blue-500 text-white">
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            <FaBagShopping size={25} /> My Orders
                        </h1>
                    </header>

                    <section className="overflow-x-auto">
                        <table className="min-w-full table-auto text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Order ID</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Address</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.length > 0 ? (
                                    renderTableData()
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <footer className="p-4 flex justify-center bg-gray-100">
                            {renderPageButtons()}
                        </footer>
                    )}
                </main>
            </div>
        </>
    );
};

export default MyOrder;
