import { useEffect, useState } from 'react'
import SideBar from './components/sidebar'
import axios from 'axios';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

interface UserType {
    id: string,
    username: string,
    email: string,
    avatar: string,
    role: string,
    gender: string,
}

const AdminCustomer = () => {
    const [customer, setCustomer] = useState<Array<any>>([]);
    // const { customer } = useGetAdminCustomersQuery();
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/user/admin/users");
            setCustomer(res.data.data);
        }
        fetchData();
    }, [])

    // pagination 
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(customer.length / itemsPerPage);
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
        return customer.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index}>
                <td><img src={item.avatar} alt="loading" /></td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.role === 'user' ? <span style={{
                    backgroundColor: 'lightgreen',
                    padding: '6px',
                    borderRadius: '0.5rem',
                }}>User</span> : <span
                    style={{
                        backgroundColor: 'orange',
                        padding: '6px',
                        borderRadius: '0.5rem',
                    }}
                >Admin</span>}</td>
            </tr>
        ));
    };
    return (
        <div className="AdminContainer">
            <aside>
                <SideBar />
            </aside>
            <main>
                <h2>Customers</h2>

                <table className='TableStyle'>
                    <thead>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Role</th>
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
    )
}

export default AdminCustomer