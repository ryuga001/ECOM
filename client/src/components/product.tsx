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
            const totalProducts = getProducts.data.filteredCount;
            const resultPerPage = getProducts.data.resultPerPage;
            setTotalPages(Math.ceil(totalProducts / resultPerPage));
        }
    }, [getProducts]);

    const handleCategory = (cn: string) => {
        setCurrentPage(1);
        setCategoryName(cn);
    };

    return (
        <div className="flex flex-col lg:flex-row  text-secondary h-full py-3   ">

            <aside className="lg:w-1/4 p-6 bg-orange-800 text-accent rounded-lg shadow-lg space-y-6 h-[max-content] ">


                <div>
                    <h2 className="text-2xl font-semibold py-1">CATEGORIES</h2>
                    <div className="h-[50vh]   overflow-y-scroll no-scrollbar p-4 ">
                        <ul className="space-y-1">
                            {getCategory?.data?.data.map((item: string, index: number) => (
                                <li
                                    key={index}
                                    onClick={() => handleCategory(item)}
                                    className={`cursor-pointer p-3 rounded-md transition duration-300 ease-in-out text-lg
                ${categoryName === item ? 'bg-primary text-accent' : 'hover:bg-secondary hover:text-accent'}`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="mt-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-[70vw] p-4 text-black text-xl rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>


                <div className='w-full flex justify-end'>
                    <button
                        onClick={() => {
                            setSearchKeyword("");
                            setCategoryName("All");
                            setCurrentPage(1);
                        }}
                        className="w-[20vw]   mt-4 py-3 bg-primary text-accent font-semibold rounded-md hover:bg-yellow-600 transition ease-in-out duration-300"
                    >
                        Reset
                    </button>
                </div>
            </aside>


            <main className="lg:w-3/4 p-6 space-y-8 ">

                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 ">
                    {getProducts?.data?.data?.map((item: any) => (
                        <ProductCard
                            key={item._id}
                            pid={item._id}
                            name={item.name}
                            imgUrl={item?.images[0]?.url}
                            price={item.price}
                            ratings={item.ratings}
                        />
                    ))}
                </div>


                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8 py-2">
                        <button
                            onClick={() => setCurrentPage(CurrentPage > 1 ? CurrentPage - 1 : CurrentPage)}
                            disabled={CurrentPage === 1}
                            className={`p-3 flex items-center justify-center rounded-[0.5rem] text-white bg-orange-600 hover:bg-orange-700 
                        transition ease-in-out duration-300 transform hover:scale-110 focus:outline-none ${CurrentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                        >
                            <HiArrowLeft className="text-xl px-1" />Prev
                        </button>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                className={`text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-200 ${CurrentPage === 1 ? 'font-bold' : ''}`}
                            >
                                1
                            </button>
                            <span className="text-lg text-gray-500">...</span>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className={`text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-200 ${CurrentPage === totalPages ? 'font-bold' : ''}`}
                            >
                                {totalPages}
                            </button>
                        </div>

                        <button
                            onClick={() => setCurrentPage(CurrentPage < totalPages ? CurrentPage + 1 : CurrentPage)}
                            disabled={CurrentPage === totalPages}
                            className={`p-3 flex items-center justify-center rounded-[0.5rem] text-white bg-orange-600 hover:bg-orange-700 
                        transition ease-in-out duration-300 transform hover:scale-110 focus:outline-none ${CurrentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                        >
                            Next  <HiArrowRight className="text-xl px-1" />
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Product;
