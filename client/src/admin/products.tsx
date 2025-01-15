import axios from "axios";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import SideBar from "./components/sidebar";
import { getAdminAddProduct, getAdminProductDelete, getAdminProducts } from "../route";
import { formDataTypeProduct } from "./admintypes";



const AdminProduct = () => {
    const [product, setProduct] = useState<Array<any>>([]);
    const [modal, setModal] = useState<boolean>(false);

    const fetchData = async () => {
        const res = await getAdminProducts();
        if (res)
            setProduct(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        const res = await getAdminProductDelete(id);
        if (res)
            fetchData();
    };

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = Math.ceil(product.length / itemsPerPage);

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return product.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index} className="hover:bg-gray-50">
                <td className="p-4">
                    <img src={item.images[0].url} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">
                    {item.ratings > 0 && (
                        <div className="text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < item.ratings ? 'filled-star' : 'empty-star'}>
                                    ★
                                </span>
                            ))}
                        </div>
                    )}
                </td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4">Rs. {item.price} /-</td>
                <td className="p-4">
                    <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                    />
                </td>
            </tr>
        ));
    };

    // Add product form state
    const [formData, setformData] = useState<formDataTypeProduct>({
        name: "",
        description: "",
        stock: 0,
        category: "",
        price: 0,
    });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(files);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("description", formData.description);
        productData.append("category", formData.category);
        productData.append("stock", `${formData.stock}`);
        productData.append("price", `${formData.price}`);
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                productData.append("image", selectedFiles[i]);
            }
        }
        const res = await getAdminAddProduct(productData);
        if (res)
            fetchData();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            <SideBar />

            <main className="flex-1 p-6">
                {!modal ? (
                    <>
                        <CgAdd
                            color="red"
                            size={35}
                            style={{ cursor: "pointer" }}
                            onClick={() => setModal(true)}
                            className="mb-4"
                        />
                        <table className="w-full table-auto bg-white rounded-lg shadow-md">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-4 text-left text-gray-600">Image</th>
                                    <th className="p-4 text-left text-gray-600">Name</th>
                                    <th className="p-4 text-left text-gray-600">Category</th>
                                    <th className="p-4 text-left text-gray-600">Ratings</th>
                                    <th className="p-4 text-left text-gray-600">Stock</th>
                                    <th className="p-4 text-left text-gray-600">Price</th>
                                    <th className="p-4 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableData()}</tbody>
                        </table>

                        {totalPages > 1 && (
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 0}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                                >
                                    <HiArrowLeft className="text-lg text-gray-600" />
                                </button>

                                <div className="text-sm text-gray-600">
                                    Page {currentPage + 1} of {totalPages}
                                </div>

                                <button
                                    onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                                >
                                    <HiArrowRight className="text-lg text-gray-600" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="form-container p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
                            <TiDeleteOutline
                                color="red"
                                size={35}
                                style={{ cursor: "pointer" }}
                                onClick={() => setModal(false)}
                                className="absolute top-4 right-4"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-group">
                                    <label htmlFor="name" className="text-gray-700">Product Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        type="text"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category" className="text-gray-700">Category</label>
                                    <input
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        type="text"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description" className="text-gray-700">Product Description</label>
                                    <input
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        type="text"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock" className="text-gray-700">Stock</label>
                                    <input
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        type="number"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price" className="text-gray-700">Price</label>
                                    <input
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        type="number"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="file" className="text-gray-700">Upload Images</label>
                                    <input
                                        id="file"
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    CREATE PRODUCT
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminProduct;
