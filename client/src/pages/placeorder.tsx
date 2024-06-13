import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { usePlaceOrderMutation } from "../store/api";
import { useAppSelector } from "../store/hook";
import { OrderItemTypeShipping, shippingDataType } from "../types/alltypes";


const BaseUrl = "http://localhost:5000/api/v1";

const PlaceOrder = () => {
    const user = useAppSelector((state) => state.user.user);
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
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingFormData(prev => ({
            ...prev, [name]: value,
        }))
    }
    const cartProduct = useAppSelector(state => state.cart.cartProduct);
    useEffect(() => {
        let shippingPrice = 70;
        let tax = 15;
        let totalPrice = shippingPrice + tax;

        let ordered_item: Array<OrderItemTypeShipping> = [];
        cartProduct.map((item) => {
            ordered_item.push({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.imgUrl,
                product: item.id,
            })
            totalPrice += (item.price) * (item.quantity);
        })
        setShippingFormData(prev => ({
            ...prev,
            totalPrice: totalPrice,
            orderedItems: ordered_item,
            taxPrice: tax,
            shippingPrice: shippingPrice,
            itemsPrice: (totalPrice - tax - shippingPrice),
            orderStatus: ("Processing"),
        }))
    }, [])
    const [PlaceOrder, { isSuccess }] = usePlaceOrderMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const res = await axios.post(`${BaseUrl}/order/new`, {
        //     shippingInfo: {
        //         address: shippingFormData.address,
        //         city: shippingFormData.city,
        //         state: shippingFormData.state,
        //         country: shippingFormData.country,
        //         pinCode: shippingFormData.pinCode,
        //         phoneNo: shippingFormData.phoneNo
        //     },
        //     orderItems: shippingFormData.orderedItems,
        //     paymentInfo: shippingFormData.paymentInfo,
        //     itemsPrice: shippingFormData.itemsPrice,
        //     taxPrice: shippingFormData.taxPrice,
        //     shippingPrice: shippingFormData.shippingPrice,
        //     totalPrice: shippingFormData.totalPrice
        // });
        PlaceOrder(
            {
                shippingInfo: {
                    address: shippingFormData.address,
                    city: shippingFormData.city,
                    state: shippingFormData.state,
                    country: shippingFormData.country,
                    pinCode: shippingFormData.pinCode,
                    phoneNo: shippingFormData.phoneNo
                },
                orderItems: shippingFormData.orderedItems,
                paymentInfo: shippingFormData.paymentInfo,
                itemsPrice: shippingFormData.itemsPrice,
                taxPrice: shippingFormData.taxPrice,
                shippingPrice: shippingFormData.shippingPrice,
                totalPrice: shippingFormData.totalPrice
            }
        )
        if (isSuccess) {
            console.log("orderPlaced");
        }
    }
    return (
        <>

            <NavBar />
            <div className='PlaceOrderContainer'>
                <main>
                    <h2>Order Details</h2>
                    <table>



                        <tbody>

                            {
                                cartProduct.map((item, index) =>
                                (

                                    <tr key={index}>
                                        <td>
                                            <img src={item.imgUrl} />
                                        </td>

                                        <td>
                                            {item.name}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>Rs.{item.price}/-</td>

                                    </tr>
                                )
                                )
                            }
                        </tbody>

                        <tfoot>

                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Amount :

                                </th>
                                <td>

                                    Rs.{shippingFormData.totalPrice - shippingFormData.taxPrice - shippingFormData.shippingPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Tax :
                                </th>
                                <td>

                                    Rs.{shippingFormData.taxPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Shpping Price :
                                </th>
                                <td>

                                    Rs.{shippingFormData.shippingPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Total Amount :
                                </th>
                                <td>

                                    Rs.{shippingFormData.totalPrice}/-</td>
                            </tr>
                        </tfoot>

                    </table>
                </main>
                <aside>
                    <h2>Shipping Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='address'>Address</label>
                            <input name="address" onChange={handleChange} id="address" value={shippingFormData.address}></input>
                        </div>
                        <div>
                            <label htmlFor='city'>City</label>
                            <input name="city" onChange={handleChange} id="city" value={shippingFormData.city}></input>
                        </div>
                        <div>
                            <label htmlFor='state'>State</label>
                            <input name="state" onChange={handleChange} id="state" value={shippingFormData.state}></input>
                        </div>
                        <div>
                            <label htmlFor='country'>Country</label>
                            <input name="country" onChange={handleChange} id="country" value={shippingFormData.country}></input>
                        </div>
                        <div>
                            <label htmlFor='pinCode'>Pin Code</label>
                            <input name="pinCode" onChange={handleChange} id="pinCode" value={shippingFormData.pinCode}></input>
                        </div>
                        <div>
                            <label htmlFor='phoneNo'>Phone No.</label>
                            <input name="phoneNo" onChange={handleChange} id="phoneNo" value={shippingFormData.phoneNo}></input>
                        </div>
                        <button type="submit">PAY</button>
                    </form>
                </aside>
            </div >
        </>
    )
}

export default PlaceOrder