
import axios from 'axios';
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import Slider from '../components/slider';
import { useDeleteReivewMutation, useGetProductQuery, useSendReviewMutation } from '../store/api';
import { addProduct } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { ProductSingleType, ReviewFormDataType } from '../types/alltypes';


const BaseUrl = "http://localhost:5000/api/v1";

const ProductDescription = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user);
    const [reviewFormData, setReviewFormData] = useState<ReviewFormDataType>({
        comment: "",
        rate: "5",
        pid: id ? id : ""
    })

    const { data: fetchProductData, refetch } = useGetProductQuery(id ? id : "");
    const [sendReview, { isSuccess: reviewSentSuccess }] = useSendReviewMutation()
    const dispatch = useAppDispatch();
    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const AddCart = () => {
        dispatch(addProduct({
            id: fetchProductData?.data?._id,
            name: fetchProductData?.data?.name,
            quantity: itemQuantity,
            imgUrl: fetchProductData?.data?.images[0].url,
            price: fetchProductData?.data?.price
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
        console.log(reviewFormData)

        sendReview(
            reviewFormData
        )

        if (reviewSentSuccess) {
            console.log("Review Sent Successfully");
            refetch()
        }
        // const res = await axios.put(`${BaseUrl}/product/review`, {
        //     rating: reviewFormData.rate,
        //     comment: reviewFormData.comment,
        //     productId: reviewFormData.pid,
        // });

        // if (!res.data.success) {
        //     console.log("Not Sent Review For ", reviewFormData.pid);
        // } else {
        //     refetch()
        // }
    }
    const [deleteReview, { isSuccess: reviewDeletionSuccess }] = useDeleteReivewMutation();
    const handleDeleteReivew = (reviewId: string) => {
        // const res = await axios.delete(`${BaseUrl}/product/reviews/${id}/${reviewId}`);
        // if (res.data.success) {
        //     refetch()
        //     alert("review deleted");
        // }
        deleteReview({ id, reviewId });
        if (reviewDeletionSuccess) {
            refetch()
        }
    }
    return (
        <>
            <NavBar />

            <div className="ProductDescriptionContainer">
                <aside>
                    <Slider images={fetchProductData?.data?.images ? fetchProductData.data.images : []} />
                </aside>
                <main>
                    <div className="product-info">
                        <h2>{fetchProductData?.data?.name}</h2>
                        <p>{fetchProductData?.data?.description}</p>
                        <div className="product-meta">
                            <span className="category">{fetchProductData?.data?.category}</span>
                            {fetchProductData?.data?.stock === 0 && <span className="unavailable">Unavailable</span>}
                            <span className="price">Rs.{fetchProductData?.data?.price}</span>
                            {fetchProductData?.data?.ratings > 0 && <div className="product-ratings">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < fetchProductData?.data?.ratings ? 'filled-star' : 'empty-star'}>★</span>
                                ))}
                            </div>}
                        </div>
                        <div className="quantity-controls">
                            <button
                                disabled={itemQuantity === 1}
                                onClick={() => setItemQuantity(itemQuantity - 1)}
                            >
                                -
                            </button>
                            <span className="quantity">{itemQuantity}</span>
                            <button
                                disabled={itemQuantity === fetchProductData?.data?.stock}
                                onClick={() => setItemQuantity(itemQuantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        {fetchProductData?.data?.stock > 0 && <button className="add-to-cart" onClick={AddCart}>Add to Cart</button>}
                    </div>
                </main>
            </div>
            <div className='ReviewContainer'>
                <div>
                    <h2>Reviews {fetchProductData?.data?.numOfReviews > 0 ? `(${fetchProductData?.data?.numOfReviews})` : ""}</h2>
                    <div className='CreateReviewBox'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='comment'
                                value={reviewFormData.comment}
                                onChange={(e) => handleChange(e)}
                                placeholder='Write a review'
                            />
                            <select
                                defaultValue={reviewFormData.rate}
                                name='rate'
                                onChange={(e) => handleChange(e)}
                                value={reviewFormData.rate}
                            >
                                <option value="5">5⭐</option>
                                <option value="4">4⭐</option>
                                <option value="3">3⭐</option>
                                <option value="2">2⭐</option>
                                <option value="1">1⭐</option>
                            </select>
                            <button type='submit'><IoSend color='green' size={30} /></button>
                        </form>
                    </div>
                    <main>
                        {fetchProductData?.data?.reviews.map((item: any) => (
                            <div key={item._id} className='ReviewItem'>
                                <h3>{item.name}</h3>
                                <div className='ReviewContent'>
                                    <p>{item.comment}</p>
                                    <div className='ReviewActions'>
                                        {item.rating > 0 && <div className="product-ratings">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} className={i < item?.rating ? 'filled-star' : 'empty-star'}>★</span>
                                            ))}
                                        </div>}
                                        {item.user === user.id && <MdDelete size={25} style={{ cursor: 'pointer' }} onClick={() => handleDeleteReivew(item._id)} />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}

export default ProductDescription