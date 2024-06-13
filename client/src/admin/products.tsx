import axios from "axios";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import SideBar from "./components/sidebar";
interface formDataType {
    name: string,
    description: string,
    stock: number,
    category: string,
    price: number,
}

const AdminProduct = () => {


    const [product, setProduct] = useState<Array<any>>([]);
    const [modal, setModal] = useState<boolean>(false);
    const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/product/admin/products");
        setProduct(res.data.data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    // const handleEdit = (id: string) => {
    //     console.log(id);
    // }
    const handleDelete = async (id: string) => {
        // console.log(id);
        const res = await axios.delete(`http://localhost:5000/api/v1/product/admin/product/${id}`);
        console.log(res.data.success);
        fetchData();
    }
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(product.length / itemsPerPage);
    const renderPageButtons = () => {
        const pages = [];
        let i = currentPage;
        pages.push(
            <button key={i} style={{ backgroundColor: currentPage === i ? "lightblue" : "" }
            } onClick={() => setCurrentPage(i)} > {i + 1}</button >
        );

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
                <td>
                    {item.ratings > 0 && <div className="product-ratings">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < item.ratings ? 'filled-star' : 'empty-star'}>★</span>
                        ))}
                    </div>}
                </td>
                <td>{item.stock}</td>
                <td>Rs. {item.price} /-</td>
                {/* <FaEdit style={{ cursor: "pointer" }} color="blue" onClick={() => handleEdit(item._id)} />   */}
                <td><FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(item._id)} color="red" /></td>
            </tr>
        ));
    };
    // add product 
    const [formData, setformData] = useState<formDataType>({
        name: "",
        description: "",
        stock: 0,
        category: "",
        price: 0,
    })
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(files);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        console.log(selectedFiles);
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("description", formData.description);
        productData.append("category", formData.category);
        productData.append("stock", `${formData.stock}`);
        productData.append("price", `${formData.price}`);
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                productData.append('image', selectedFiles[i]);
            }
        }
        const res = await axios.post("http://localhost:5000/api/v1/product/admin/product/new", productData);
        console.log(res.data.success);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev, [name]: value,
        }))
    }

    return (
        <div className="AdminContainer">
            <aside>
                <SideBar />
            </aside>
            <main>
                {/* <h2>Products</h2> */}
                {
                    !modal ? <>
                        <CgAdd color="red" size={35} style={{ cursor: "pointer" }} onClick={() => setModal(true)} />
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
                                {renderTableData()}

                            </tbody>
                            <tfoot>


                                {totalPages > 1 && <div className='PaginationBox2'>
                                    <button onClick={() => {
                                        if (currentPage > 0) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }} disabled={currentPage === 0}><HiArrowLeft /></button>

                                    <button onClick={() => {
                                        if (currentPage < totalPages - 1) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }} disabled={currentPage === totalPages - 1}><HiArrowRight /></button>
                                </div>}

                            </tfoot>
                        </table>

                    </> : <>
                        <div className="form-container">
                            <TiDeleteOutline color="red" size={35} style={{ cursor: "pointer" }} onClick={() => setModal(false)} />
                            <h2>Product Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input id="name" name="name" value={formData.name} type="text" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <input id="category" name="category" value={formData.category} type="text" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Product Description</label>
                                    <input id="description" name="description" value={formData.description} type="text" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input id="stock" name="stock" value={formData.stock} type="number" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input id="price" name="price" value={formData.price} type="number" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file">Upload Images</label>
                                    <input id="file" type="file" multiple onChange={handleFileChange} />
                                </div>
                                <button type="submit">CREATE PRODUCT</button>
                            </form>
                        </div>
                    </>
                }
            </main>
        </div>
    )
}

export default AdminProduct