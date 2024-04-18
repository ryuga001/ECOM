import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hook";
import { FaBagShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import NavBar from "../components/navbar";

interface OrderItemType {
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    product: string,
    // _id: string,
}
interface paymentInfoType {
    id: string,
    status: string,
}
interface shippingDataType {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string,
    phoneNo: string,
    orderedItems: Array<OrderItemType>,
    user: string,
    paymentInfo: paymentInfoType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: string,
}

const PlaceOrder = () => {
    const [shippingFormData, setShippingFormData] = useState<shippingDataType>({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
        orderedItems: [],
        user: "userid",
        paymentInfo: {
            id: "",
            status: "notpaid",
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

        let ordered_item: Array<OrderItemType> = [];
        cartProduct.map((item) => {
            ordered_item.push({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imgUrl,
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(shippingFormData);
    }
    return (
        <>
            {/* <FaHome style={{ cursor: "pointer", margin: "1rem", }} size={25} /> */}
            <NavBar />
            <div className='PlaceOrderContainer'>
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
                                    {/* < hr /> */}
                                    Rs.{shippingFormData.totalPrice - shippingFormData.taxPrice - shippingFormData.shippingPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Tax :
                                </th>
                                <td>
                                    {/* < hr /> */}
                                    Rs.{shippingFormData.taxPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Shpping Price :
                                </th>
                                <td>
                                    {/* < hr /> */}
                                    Rs.{shippingFormData.shippingPrice}/-</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>
                                    Total Amount :
                                </th>
                                <td>
                                    {/* < hr /> */}
                                    Rs.{shippingFormData.totalPrice}/-</td>
                            </tr>
                        </tfoot>

                    </table>
                </main>
            </div >
        </>
    )
}

export default PlaceOrder