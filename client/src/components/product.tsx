import React, { useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa';
import { FaShareNodes } from 'react-icons/fa6';
import ProductCard from './productcard';
// const categories = [
//     { name: "Apparel and Fashion" },
//     { name: "Electronics" },
//     { name: "Beauty and Personal Care" },
//     { name: "Home and Kitchen" },
//     { name: "Health and Wellness" },
//     { name: "Books and Media" },
//     { name: "Toys and Games" },
//     { name: "Sports and Outdoors" },
//     { name: "Grocery and Food" },
//     { name: "Automotive" },
//     { name: "Apparel and Fashion" },
//     { name: "Electronics" },
//     { name: "Beauty and Personal Care" },
//     { name: "Home and Kitchen" },
//     { name: "Health and Wellness" },
//     { name: "Books and Media" },
//     { name: "Toys and Games" },
//     { name: "Sports and Outdoors" },
//     { name: "Grocery and Food" },
//     { name: "Automotive" },
// ]

const Product = () => {
    const item =
    {
        _id: "6619ea48c112fa07f48b1ae8",
        name: "tshirt",
        description: "this is a t shirt for men ",
        price: 669,
        ratings: 0,
        images: [
            {
                imageId: "4e234653-bdd4-400a-a75a-0820773c842e.png",
                url: "https://m.media-amazon.com/images/I/91eY68L5j9L._SX569_.jpg",
            },
            {
                imageId: "459ebc09-8351-45ae-b13a-74522ba88200.png",
                url: "\\Users\\rahul\\OneDrive\\Desktop\\New folder\\server\\uploads\\459ebc09-8351-45ae-b13a-74522ba88200.png",
            },
            {
                imageId: "e83cfa20-0406-47a7-9555-f2a7d4024d3c.png",
                url: "\\Users\\rahul\\OneDrive\\Desktop\\New folder\\server\\uploads\\e83cfa20-0406-47a7-9555-f2a7d4024d3c.png",
            },
            {
                imageId: "4cc7be4c-feeb-49a2-b59c-475ce2dc3377.png",
                url: "\\Users\\rahul\\OneDrive\\Desktop\\New folder\\server\\uploads\\4cc7be4c-feeb-49a2-b59c-475ce2dc3377.png",
            },
            {
                imageId: "aaabc926-2a78-4247-aca3-c74d6a3569d1.png",
                url: "\\Users\\rahul\\OneDrive\\Desktop\\New folder\\server\\uploads\\aaabc926-2a78-4247-aca3-c74d6a3569d1.png",
            }
        ],
        category: "clothes",
        stock: 1,
        numOfReviews: 0,
        user: "6618148ba63df242a1129a84",
        reviews: [],
    }

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
                            {/* {
                                categories.map((item) => {
                                    return (
                                        <li><option>{item.name}</option></li>
                                    )
                                }
                                )
                            } */}
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
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />
                    <ProductCard pid={item._id} name={item.name} description={item.description} imgUrl={item.images[0].url} price={item.price} ratings={item.ratings} />

                </div>
            </main>
        </div >
    )
}

export default Product