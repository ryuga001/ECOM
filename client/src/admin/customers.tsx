import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { getAdminCustomers } from '../route';
import SideBar from './components/sidebar';



const AdminCustomer = () => {
    const [customer, setCustomer] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAdminCustomers();
            if (res)
                setCustomer(res.data);
        };
        fetchData();
    }, []);


    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(customer.length / itemsPerPage);

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return customer.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index} className="hover:bg-gray-100 transition duration-200">
                <td className="p-4">
                    <img src={item.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-4">{item.username}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.gender}</td>
                <td className="p-4">
                    {item.role === 'user' ? (
                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">User</span>
                    ) : (
                        <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">Admin</span>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            <SideBar />

            <main className="flex-1 p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customers</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-4 text-left text-gray-600">Avatar</th>
                                <th className="p-4 text-left text-gray-600">Username</th>
                                <th className="p-4 text-left text-gray-600">Email</th>
                                <th className="p-4 text-left text-gray-600">Gender</th>
                                <th className="p-4 text-left text-gray-600">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableData()}
                        </tbody>
                    </table>
                </div>


                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="flex items-center justify-center bg-gray-200 p-2 rounded-full cursor-pointer disabled:bg-gray-300 hover:bg-gray-300 transition duration-200"
                        >
                            <HiArrowLeft className="text-lg text-gray-600" />
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="flex items-center justify-center bg-gray-200 p-2 rounded-full cursor-pointer disabled:bg-gray-300 hover:bg-gray-300 transition duration-200"
                        >
                            <HiArrowRight className="text-lg text-gray-600" />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminCustomer;
