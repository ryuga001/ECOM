import { useNavigate } from "react-router-dom"

interface ProductPropsType {
    pid?: string,
    name?: string,
    description?: string,
    imgUrl?: string,
    price?: number,
    ratings?: number,
}

const ProductCard = ({ pid, name, description, imgUrl, price, ratings }: ProductPropsType) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${pid}`)} className="ProductCardContainer">
            <img src={imgUrl} alt="loading" />
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div>
                <span>₹{price}</span>
                <span>{ratings}⭐</span>
            </div>
        </div>
    )
}

export default ProductCard