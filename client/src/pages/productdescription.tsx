
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import { addProduct } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { MdDelete } from 'react-icons/md';
import Slider from '../components/slider';
import { FaSquareMinus } from 'react-icons/fa6';

interface ReviewFormDataType {
    comment: string,
    rate: string,
    pid?: string,
}

interface ImageArrayType {
    imageId: string,
    url: string,
}

interface ProductSingleType {
    _id: string,
    name: string,
    description: string,
    price: number,
    ratings: number,
    images: Array<ImageArrayType>,
    category: string,
    stock: number,
    reviews: Array<any>,
    numOfReviews: number,
    user: string,
}


const ProductDescription = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user);
    const [reviewFormData, setReviewFormData] = useState<ReviewFormDataType>({
        comment: "",
        rate: "5",
        pid: id?.toString(),
    })
    const [product, setProduct] = useState<ProductSingleType>({
        _id: "",
        name: "",
        description: "",
        price: 0,
        ratings: 0,
        images: [],
        category: "",
        stock: 0,
        reviews: [],
        numOfReviews: 0,
        user: "",
    });
    const fetchProduct = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
        if (res.data.success) {
            console.log(res.data.data);
            setProduct({
                _id: res.data.data._id,
                name: res.data.data.name,
                description: res.data.data.description,
                price: res.data.data.price,
                ratings: res.data.data.ratings,
                images: res.data.data.images,
                category: res.data.data.category,
                stock: res.data.data.stock,
                reviews: res.data.data.reviews,
                numOfReviews: res.data.data.numOfReviews,
                user: res.data.data.user,
            })
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);
    const dispatch = useAppDispatch();
    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const AddCart = () => {
        dispatch(addProduct({
            id: product._id,
            name: product.name,
            quantity: itemQuantity,
            imgUrl: product.images[0].url,
            price: product.price
        }));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReviewFormData((prev) => ({
            ...prev, [name]: value,
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.id) {
            alert("You are not logged In 😊");
            return;
        }
        // console.log(reviewFormData);
        const res = await axios.put("http://localhost:5000/api/v1/product/review", {
            rating: reviewFormData.rate,
            comment: reviewFormData.comment,
            productId: reviewFormData.pid,
        });

        if (!res.data.success) {
            console.log("Not Sent Review For ", reviewFormData.pid);
        }
    }
    const handleDeleteReivew = async (reviewId: string) => {
        const res = await axios.delete(`http://localhost:5000/api/v1/product/reviews/${id}/${reviewId}`);
        if (res.data.success) {
            // fetchProduct();
            alert("review deleted");
        }
    }
    return (
        <>
            <NavBar />
            <div className="ProductDescriptionContainer">
                <aside>
                    {/* <Slider images={product.images} /> */}
                </aside>
                <main>
                    <div>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div>
                            <span>{product.category}</span>
                            {product.stock == 0 && <span style={{ backgroundColor: "orange" }}>Unavlaible</span>}
                            {product.ratings > 0 && <span>{product.ratings}⭐</span>}
                            <span style={{ backgroundColor: "lightgreen" }}>Rs.{product.price}</span>
                        </div>
                        <div>

                            <button disabled={itemQuantity == 1} onClick={() => setItemQuantity(itemQuantity - 1)} style={{ height: "1rem", width: "1rem", backgroundColor: "blueviolet", border: "none", fontSize: "large", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                            {itemQuantity}
                            <button disabled={itemQuantity == product.stock} style={{ height: "1rem", width: "1rem", backgroundColor: "blueviolet", border: "none", fontSize: "large", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setItemQuantity(itemQuantity + 1)}>+</button>
                        </div>
                        {product.stock > -1 && <button onClick={() => AddCart()}>Add to Cart</button>}
                    </div>
                </main>
            </div>
            <div className='ReviewContainer'>
                <div>
                    <h2>Reivews {product.numOfReviews > 0 ? `(${product.numOfReviews})` : ""}</h2>
                    <div className='CreateReviewBox'>
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='comment' value={reviewFormData.comment}

                                onChange={(e) => handleChange(e)}

                                placeholder='write a review' />
                            <select defaultValue={reviewFormData.rate} name='rate' onChange={(e) => handleChange(e)} value={reviewFormData.rate} >
                                <option value="5" >5⭐</option>
                                <option value="4">4⭐</option>
                                <option value="3">3⭐</option>
                                <option value="2">2⭐</option>
                                <option value="1">1⭐</option>
                            </select>
                            <button><IoSend color='green' size={30} /></button>
                        </form>
                    </div>
                    <main>
                        {
                            product.reviews.map((item) => (
                                <div>
                                    <h3>{item.name}</h3>
                                    <div>
                                        <div>
                                            <p>{item.comment}</p>
                                        </div>
                                        <div>
                                            {item.rating}⭐{item.user === user.id ? <MdDelete size={25} style={{ cursor: "pointer" }} onClick={() => handleDeleteReivew(item._id)} /> : ""}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </main>
                </div>
            </div>
        </>
    )
}

export default ProductDescription