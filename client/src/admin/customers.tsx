import { useEffect, useState } from 'react'
import SideBar from './components/sidebar'
import axios from 'axios';

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
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/user/admin/users");
            // console.log(res.data);
            // const temp: Array<UserType> = [];
            // res.data.forEach((item: any) => {
            //     temp.push({
            //         id: item._id,
            //         username: item.username,
            //         email: item.email,
            //         avatar: item.avatar,
            //         role: item.role,
            //         gender: item.gender,
            //     })
            // })
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
                <td>{item.role}</td>
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

                        <div>
                            {renderPageButtons()}
                        </div>
                    </tfoot>

                </table>
            </main>
        </div>
    )
}

export default AdminCustomer