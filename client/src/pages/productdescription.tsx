import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import Slider from '../components/slider';

import Footer from '../components/footer';
import { useGetProductQuery } from '../store/api';
import { addProduct } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { ReviewFormDataType } from '../types/alltypes';
import { deleteReviewData, sendReviewData } from '../route';



const ProductDescription = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user);
    const [reviewFormData, setReviewFormData] = useState<ReviewFormDataType>({
        comment: "",
        rate: "5",
        pid: id ? id : ""
    });

    const { data: fetchProductData, refetch } = useGetProductQuery(id ? id : "");

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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReviewFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.id) {
            alert("You are not logged In 😊");
            return;
        }
        const res = await sendReviewData(reviewFormData);

        if (res) {
            refetch();
        }
    };


    const handleDeleteReivew = async (reviewId: string) => {
        const res = await deleteReviewData(id, reviewId);
        if (res) {
            refetch();
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col lg:flex-row p-6 bg-orange-50  ">

                <aside className="w-full lg:w-1/2">
                    <Slider images={fetchProductData?.data?.images ? fetchProductData.data.images : []} />
                </aside>
                <main className="w-full lg:w-1/2 flex flex-col justify-between  p-3">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">

                        <h2 className="text-3xl font-semibold text-gray-800">{fetchProductData?.data?.name}</h2>
                        <p className="text-gray-600 text-lg">{fetchProductData?.data?.description}</p>


                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900">Rs.{fetchProductData?.data?.price}</span>
                            <div className="flex items-center space-x-1">
                                {fetchProductData?.data?.ratings > 0 && (
                                    <div className="flex space-x-1 text-yellow-400">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} className={i < fetchProductData?.data?.ratings ? 'filled-star' : 'empty-star'}>★</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="flex items-center space-x-4">
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-300"
                                disabled={itemQuantity === 1}
                                onClick={() => setItemQuantity(itemQuantity - 1)}
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold">{itemQuantity}</span>
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-300"
                                disabled={itemQuantity === fetchProductData?.data?.stock}
                                onClick={() => setItemQuantity(itemQuantity + 1)}
                            >
                                +
                            </button>
                        </div>


                        {fetchProductData?.data?.stock > 0 && (
                            <button
                                onClick={AddCart}
                                className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </main>
            </div>


            <div className='w-full bg-orange-50 lg:flex lg:justify-center pb-9' >


                <div className="mt-12 px-6  lg:w-[80vw]  ">
                    <h2 className="text-2xl  font-semibold text-gray-800">Reviews {fetchProductData?.data?.numOfReviews > 0 && `(${fetchProductData?.data?.numOfReviews})`}</h2>
                    <div className="my-6">
                        <form onSubmit={handleSubmit} className="flex space-x-4 items-center bg-white shadow-lg p-4 rounded-md">
                            <input
                                type="text"
                                name="comment"
                                value={reviewFormData.comment}
                                onChange={handleChange}
                                placeholder="Write a review"
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <select
                                name="rate"
                                value={reviewFormData.rate}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="5">5⭐</option>
                                <option value="4">4⭐</option>
                                <option value="3">3⭐</option>
                                <option value="2">2⭐</option>
                                <option value="1">1⭐</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                            >
                                <IoSend size={24} />
                            </button>
                        </form>
                    </div>

                    <div>
                        {fetchProductData?.data?.reviews.map((item: any) => (
                            <div key={item._id} className="flex flex-col space-y-4 bg-white p-6 shadow-md rounded-md my-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    {item.user === user.id && (
                                        <MdDelete
                                            size={24}
                                            className="text-red-500 cursor-pointer hover:text-red-700"
                                            onClick={() => handleDeleteReivew(item._id)}
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-600">{item.comment}</p>
                                    <div className="mt-2 flex space-x-1 text-yellow-400">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} className={i < item?.rating ? 'filled-star' : 'empty-star'}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDescription;
