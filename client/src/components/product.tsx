import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useGetCategoryQuery, useGetProductsQuery } from '../store/api';
import ProductCard from './productcard';

const Product = () => {

    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [CurrentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [categoryName, setCategoryName] = useState<string>("All");
    const getProducts = useGetProductsQuery({ categoryName, searchKeyword, CurrentPage });

    const getCategory = useGetCategoryQuery();
    useEffect(() => {
        if (getProducts.isSuccess) {
            console.log(getProducts.data);
            const toatalProducts = getProducts.data.filteredCount;
            const resultPerPage = getProducts.data.resultPerPage;
            setTotalPages(Math.ceil(toatalProducts / resultPerPage));
        }
        console.log(totalPages)
    }, [getProducts])
    const handleCategory = (cn: string) => {
        setCurrentPage(1);
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
                                getCategory?.data?.data.map((item: string, index: number) => {
                                    return (
                                        <li key={index} onClick={() => handleCategory(item)} style={{ backgroundColor: (categoryName === item ? "lightblue" : "") }}>{item}</li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </div>

                    <div className='SearchBox'>
                        <div>
                            <input type='text' placeholder='Search...' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={() => {
                        setSearchKeyword("")
                        setCategoryName("All")
                        setCurrentPage(1);
                    }}>Reset Filters</button>
                </div>
            </aside >
            <main>
                <h2>Products</h2>
                <div>
                    {

                        getProducts?.data?.data?.map((item: any) => (
                            <ProductCard key={item._id} pid={item._id} name={item.name} imgUrl={item?.images[0]?.url} price={item.price} ratings={item.ratings} />
                        ))
                    }

                </div>
                {totalPages > 1 && <div className='PaginationBox'>
                    <button onClick={() => {
                        if (CurrentPage > 1) {
                            setCurrentPage(CurrentPage - 1);
                        }
                    }} disabled={CurrentPage === 1}><HiArrowLeft /></button>
                    <button>{CurrentPage}</button>
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