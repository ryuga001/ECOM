import { useNavigate } from "react-router-dom"
import { ProductPropsType } from "../types/propsType";

const ProductCard = ({ pid, name, imgUrl, price, ratings }: ProductPropsType) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${pid}`)} className="ProductCardContainer">
            <img src={imgUrl} alt="loading" />
            <div>
                <h3>{name}</h3>

                <div>
                    <span className="product-price">₹{price}</span>
                    {ratings > 1 &&
                        <div className="product-ratings">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < ratings ? 'filled-star' : 'empty-star'}>★</span>
                            ))}
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default ProductCard