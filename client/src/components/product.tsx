import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import ProductCard from './productcard';
interface itemType {
    id: string,
    name: string,
    description: string,
    ratings: number,
    price: number,
    imgUrl?: string,
    category: string,
}
const Product = () => {
    const [products, setProducts] = useState<Array<itemType>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [CurrentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [categoryName, setCategoryName] = useState<string>("All");
    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/product/allProducts?" + (categoryName !== "All" ? `&category=${categoryName}` : "")
            + `&keyword=${searchKeyword}` + `&page=${CurrentPage}`);
        if (res.data.success) {
            if (categoryName === "All")
                setTotalPages(Math.ceil((res.data.productsCount) / (res.data.resultPerPage)));
            else {
                setTotalPages(Math.ceil((res.data.filteredCount) / (res.data.resultPerPage)));
            }
            // console.log(res.data)
            const tempProduct: Array<itemType> = [];
            res.data.data.forEach((item: any) => {
                tempProduct.push({
                    id: item._id,
                    name: item.name,
                    description: item.description,
                    ratings: item.ratings,
                    price: item.price,
                    category: item.category,
                    imgUrl: item.images[0].url
                })
            })
            setProducts(tempProduct);
        }
    }
    // const renderPageButtons = () => {
    //     const pages = [];
    //     let start: number = CurrentPage - 1;
    //     let end: number = CurrentPage + 1;
    //     for (let i = 1; i <= totalPages; i++) {
    //         pages.push(
    //             <button key={i} style={{ backgroundColor: CurrentPage === i ? "lightblue" : "" }
    //             } onClick={() => { setCurrentPage(i) }} > {i}</button >
    //         );
    //     }
    //     return pages;
    // };
    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/product/all/categories");
        console.log(res.data);
        if (res.data.success) {
            setCategories(res.data.data);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [searchKeyword, CurrentPage, categoryName])

    const handleCategory = (cn: string) => {
        setCategoryName(cn);
    }
    return (
        <div className="ProductContainer">
            <aside>
                <div>
                    <h2>Filter</h2>
                    <div>
                        <h3>Categories</h3>
                        <ul>
                            {
                                categories.length > 0 && categories.map((item) => {
                                    return (
                                        <li onClick={() => handleCategory(item)} style={{ backgroundColor: (categoryName === item ? "lightblue" : "") }}>{item}</li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </div>
                    {/* <div>
                        <label htmlFor='price'>Price :</label>
                        <div>
                            <input id="price" value={price} onChange={(e
                            ) => OnPriceChange(e)} type='range' min="0" max="1000000" />
                            <button>{price}</button>
                        </div>

                    </div> */}
                    <div className='SearchBox'>
                        <div>
                            <input type='text' placeholder='Search...' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />

                            {/* <IoSearch size={30} style={{ cursor: "pointer", backgroundColor: "lightblue", borderRadius: "10%", }} /> */}
                        </div>
                    </div>
                    <button onClick={() => {
                        setSearchKeyword("")
                        setCategoryName("All")
                    }}>Reset Filters</button>
                </div>
            </aside >
            <main>

                <div>
                    {
                        products.length > 0 &&
                        products.map((item: itemType) => (
                            <ProductCard key={item.id} pid={item.id} name={item.name} imgUrl={item.imgUrl} price={item.price} ratings={item.ratings} />
                        ))
                    }

                </div>
                {totalPages > 1 && <div className='PaginationBox'>
                    <button onClick={() => {
                        if (CurrentPage > 1) {
                            setCurrentPage(CurrentPage - 1);
                        }
                    }} disabled={CurrentPage === 1}><HiArrowLeft /></button>
                    {/* {CurrentPage > 2 && "..."} */}
                    {/* <button >{CurrentPage}</button> */}
                    {/* {CurrentPage < totalPages - 2 && "..."} */}
                    <button onClick={() => {
                        if (CurrentPage < totalPages) {
                            setCurrentPage(CurrentPage + 1);
                        }
                    }} disabled={CurrentPage === totalPages}><HiArrowRight /></button>
                </div>}
            </main>
        </div >
    )
}

export default Product