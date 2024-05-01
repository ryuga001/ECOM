import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import SideBar from "./components/sidebar";

const AdminProduct = () => {
    const [product, setProduct] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/product/admin/products");
            setProduct(res.data.data);
        }
        fetchData();
    }, [])
    // const handleEdit = (id: string) => {
    //     console.log(id);
    // }
    const handleDelete = (id: string) => {
        console.log(id);
    }
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(product.length / itemsPerPage);
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
        return product.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index}>
                <td><img src={item.images[0].url} /></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.ratings}⭐</td>
                <td>{item.stock}</td>
                <td>Rs. {item.price} /-</td>
                {/* <FaEdit style={{ cursor: "pointer" }} color="blue" onClick={() => handleEdit(item._id)} />   */}
                <td><FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(item._id)} color="red" /></td>
            </tr>
        ));
    };
    return (
        <div className="AdminContainer">
            <aside>
                <SideBar />
            </aside>
            <main>
                {/* <h2>Products</h2> */}
                <table className='TableStyle'>
                    <thead>
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th></th>
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

export default AdminProduct