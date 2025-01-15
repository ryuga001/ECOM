import { useEffect, useState } from "react";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { placeOrderData } from "../route";
import { useAppSelector } from "../store/hook";
import { OrderItemTypeShipping, shippingDataType } from "../types/alltypes";


const PlaceOrder = () => {
    const user = useAppSelector((state) => state.user.user);
    const cartProduct = useAppSelector((state) => state.cart.cartProduct);

    const [shippingFormData, setShippingFormData] = useState<shippingDataType>({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
        orderedItems: [],
        user: user.id,
        paymentInfo: {
            id: "16546161",
            status: "paid",
        },
        itemsPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
        orderStatus: "pending",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        let shippingPrice = 70;
        let tax = 15;
        let totalPrice = shippingPrice + tax;

        const orderedItems: OrderItemTypeShipping[] = cartProduct.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.imgUrl,
            product: item.id,
        }));

        cartProduct.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        setShippingFormData((prev) => ({
            ...prev,
            totalPrice,
            orderedItems,
            taxPrice: tax,
            shippingPrice,
            itemsPrice: totalPrice - tax - shippingPrice,
            orderStatus: "Processing",
        }));
    }, [cartProduct]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await placeOrderData({
            shippingInfo: {
                address: shippingFormData.address,
                city: shippingFormData.city,
                state: shippingFormData.state,
                country: shippingFormData.country,
                pinCode: shippingFormData.pinCode,
                phoneNo: shippingFormData.phoneNo,
            },
            orderItems: shippingFormData.orderedItems,
            paymentInfo: shippingFormData.paymentInfo,
            itemsPrice: shippingFormData.itemsPrice,
            taxPrice: shippingFormData.taxPrice,
            shippingPrice: shippingFormData.shippingPrice,
            totalPrice: shippingFormData.totalPrice,
        })

        if (res) {
            console.log("Order placed successfully!");
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col bg-orange-50 lg:flex-row gap-8 p-6 lg:p-12">
                <main className="flex-1 h-full">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse bg-white">
                            <thead className="bg-gray-500 text-white">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Quantity</th>
                                    <th className="p-4">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProduct.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-4">
                                            <img
                                                src={item.imgUrl}
                                                alt={item.name}
                                                className="h-16 w-16 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{item.quantity}</td>
                                        <td className="p-4">₹{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-500 text-white">
                                <tr>
                                    <td colSpan={2}></td>
                                    <th className="p-4">Amount:</th>
                                    <td className="p-4">₹{shippingFormData.itemsPrice}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <th className="p-4">Tax:</th>
                                    <td className="p-4">₹{shippingFormData.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <th className="p-4">Shipping:</th>
                                    <td className="p-4">₹{shippingFormData.shippingPrice}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <th className="p-4">Total:</th>
                                    <td className="p-4">₹{shippingFormData.totalPrice}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </main>
                <aside className="flex-1 bg-white p-6 rounded-md shadow-md h-[max-content]">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {["address", "city", "state", "country", "pinCode", "phoneNo"].map((field) => (
                            <div key={field}>
                                <label
                                    htmlFor={field}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    id={field}
                                    value={(shippingFormData as any)[field]}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition"
                        >
                            PAY
                        </button>
                    </form>
                </aside>
            </div>
            <Footer />
        </>
    );
};

export default PlaceOrder;
