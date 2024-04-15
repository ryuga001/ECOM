import { useEffect, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import ProductCard from './productcard';
import axios from 'axios';
interface itemType {
    id: string,
    name: string,
    description: string,
    ratings: number,
    price: number,
    imgUrl?: string,
}


const Product = () => {
    const [products, setProducts] = useState<Array<itemType>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/product/allProducts");
            if (res.data.success) {
                const tempProduct: Array<itemType> = [];
                const tempCat: Array<string> = [];
                res.data.data.forEach((item: any) => {
                    tempCat.push((item.category).toUpperCase());
                    tempProduct.push({
                        id: item._id,
                        name: item.name,
                        description: item.description,
                        ratings: item.ratings,
                        price: item.price,
                        // imgUrl: item.images[0].url ? item.images[0].url : "",
                    })
                })
                setCategories(tempCat);
                setProducts(tempProduct);
            }
        }
        fetchProducts();
    }, [])
    console.log(categories);
    const [price, setprice] = useState<number>(0);
    return (
        <div className="ProductContainer">
            <aside>
                <div>
                    <h2>Filter</h2>
                    <div>
                        <h3>Categories</h3>
                        <ul>
                            <li>All</li>
                            {
                                categories.length > 0 && categories.map((item) => {
                                    return (
                                        <li><option>{item}</option></li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </div>
                    <div>
                        <label htmlFor='price'>Price :</label>
                        <div>
                            <input id="price" value={price} onChange={(e: any
                            ) => setprice(e.target.value)} type='range' min="0" max="1000000" />
                            <button>{price}</button>
                        </div>

                    </div>
                </div>
            </aside >
            <main>
                <div>
                    <input type='text' placeholder='Search...' />
                    <FaArrowCircleRight style={{ cursor: "pointer" }} size={30} />
                </div>
                <div>
                    {
                        products.length > 0 &&
                        products.map((item: itemType) => (
                            <ProductCard pid={item.id} name={item.name} description={item.description} imgUrl={item.imgUrl} price={item.price} ratings={item.ratings} />
                        ))
                    }

                </div>
            </main>
        </div >
    )
}

export default Product