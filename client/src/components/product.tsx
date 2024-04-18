import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
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
    const fetchProducts = async (categoryName: string) => {
        const res = await axios.get("http://localhost:5000/api/v1/product/allProducts?" + (categoryName !== "All" ? `&category=${categoryName}` : "")
            + `&keyword=${searchKeyword}`);
        if (res.data.success) {
            const tempProduct: Array<itemType> = [];
            res.data.data.forEach((item: any) => {
                tempProduct.push({
                    id: item._id,
                    name: item.name,
                    description: item.description,
                    ratings: item.ratings,
                    price: item.price,
                    category: item.category,
                    // imgUrl: item.images[0].url ? item.images[0].url : "",
                })
            })
            setProducts(tempProduct);
        }
    }

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/product/allProducts");
        if (res.data.success) {
            const temp: string[] = [];
            res.data.data.forEach((item: any) => {
                temp.push(item.category);
            })
            setCategories(Array.from(new Set(temp)));
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts("All");
    }, [searchKeyword])

    const handleCategory = (categoryName: string) => {
        fetchProducts(categoryName);
    }
    // const OnPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setprice(Number(e.target.value));
    // }
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
                                        <li onClick={() => handleCategory(item)}>{item}</li>
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

                            <IoSearch size={30} style={{ cursor: "pointer", backgroundColor: "lightblue", borderRadius: "10%", }} />
                        </div>
                    </div>
                    <button onClick={() => {
                        setSearchKeyword("")
                        fetchProducts("All")
                    }}>Reset Filters</button>
                </div>
            </aside >
            <main>

                <div>
                    {
                        products.length > 0 &&
                        products.map((item: itemType) => (
                            <ProductCard pid={item.id} name={item.name} imgUrl={item.imgUrl} price={item.price} ratings={item.ratings} />
                        ))
                    }

                </div>
            </main>
        </div >
    )
}

export default Product