import { FaTrash } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import { removeProduct } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from "../store/hook";

const Cart = () => {
    const cartProduct = useAppSelector(state => state.cart.cartProduct);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const priceCalculate = () => {
        return cartProduct.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const RemoveFromCart = (id: string) => {
        dispatch(removeProduct(id));
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-orange-50 py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-6">
                        <FaCartShopping size={60} className="text-gray-600" />
                        <h1 className="text-3xl font-bold text-gray-700 ml-4">Your Cart</h1>
                    </div>

                    {cartProduct.length > 0 ? (
                        <div className="bg-white shadow-md rounded-lg p-6 ">
                            <table className="w-full  table-auto border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-gray-600">Image</th>
                                        <th className="text-left p-4 font-medium text-gray-600">Name</th>
                                        <th className="text-left p-4 font-medium text-gray-600">Quantity</th>
                                        <th className="text-left p-4 font-medium text-gray-600">Price</th>
                                        <th className="text-center p-4 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {cartProduct.map((item, index) => (
                                        <tr key={index} className="border-b last:border-none">
                                            <td className="p-4">
                                                <img
                                                    src={item.imgUrl}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            </td>
                                            <td className="p-4 text-gray-700">{item.name}</td>
                                            <td className="p-4 text-gray-700">{item.quantity}</td>
                                            <td className="p-4 text-gray-700">Rs.{item.price}/-</td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => RemoveFromCart(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-100">
                                        <td colSpan={3} className="p-4 text-right font-bold text-gray-700">
                                            Total Amount:
                                        </td>
                                        <td className="p-4 font-bold text-gray-700">
                                            Rs.{priceCalculate()}/-
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => navigate('/place_order')}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow-md"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center mt-20">
                            <p className="text-xl font-medium text-gray-600">Your cart is empty!</p>
                            <p className="text-gray-500 mt-2">Start adding items to your cart now.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
