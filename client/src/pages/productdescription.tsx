

import 'react-awesome-slider/dist/styles.css';
import { IoSend } from 'react-icons/io5';
import NavBar from '../components/navbar';
import Slider from "../components/slider";
import { addProduct } from '../store/cartSlice';
import { useAppDispatch } from '../store/hook';
const item =
{
    _id: "6619ea48c112fa07f48b1ae8",
    name: "tshirt",
    description: "this is a t shirt for men ",
    price: 669,
    ratings: 1,
    images: [
        {
            imageId: "4e234653-bdd4-400a-a75a-0820773c842e.png",
            url: "https://m.media-amazon.com/images/I/91eY68L5j9L._SX569_.jpg",
        },
        {
            imageId: "459ebc09-8351-45ae-b13a-74522ba88200.png",
            url: "https://m.media-amazon.com/images/I/91UdWh7kiwL._SX569_.jpg",
        },
        {
            imageId: "e83cfa20-0406-47a7-9555-f2a7d4024d3c.png",
            url: "https://m.media-amazon.com/images/I/91yAKmRHWJL._SX569_.jpg",
        },
        {
            imageId: "4cc7be4c-feeb-49a2-b59c-475ce2dc3377.png",
            url: "https://m.media-amazon.com/images/I/91sDAFsdc6L._SX569_.jpg",
        },
        {
            imageId: "aaabc926-2a78-4247-aca3-c74d6a3569d1.png",
            url: "https://m.media-amazon.com/images/I/81JtOLO46sL._SX569_.jpg",
        }
    ],
    category: "clothes",
    stock: 10,
    numOfReviews: 0,
    user: "6618148ba63df242a1129a84",
    reviews: [],
}



const ProductDescription = () => {

    const dispatch = useAppDispatch();
    const AddCart = () => {
        dispatch(addProduct({
            id: item._id,
            name: item.name,
            quantity: 1,
            imgUrl: "https://m.media-amazon.com/images/I/91UdWh7kiwL._SX569_.jpg",
            price: item.price
        }));
    }
    return (
        <>
            <NavBar />
            <div className="ProductDescriptionContainer">
                <aside>
                    <Slider images={item.images} />
                </aside>
                <main>
                    <div>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <div>
                            <span>{item.category}</span>
                            {item.stock == 0 && <span style={{ backgroundColor: "orange" }}>Unavlaible</span>}
                            {item.ratings > 0 && <span>{item.ratings}⭐</span>}
                            <span style={{ backgroundColor: "lightgreen" }}>Rs.{item.price}</span>
                        </div>
                        <button onClick={() => AddCart()}>Add to Cart</button>
                    </div>
                </main>
            </div>
            <div className='ReviewContainer'>
                <div>
                    <h2>Reivews</h2>
                    <div className='CreateReviewBox'>
                        <form>
                            <input type='text' placeholder='write a review' />
                            <select value="rate">
                                <option value="5">5⭐</option>
                                <option value="4">4⭐</option>
                                <option value="3">3⭐</option>
                                <option value="2">2⭐</option>
                                <option value="1">1⭐</option>
                            </select>
                            <button><IoSend color='green' size={30} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDescription