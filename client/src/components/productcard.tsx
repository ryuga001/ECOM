import { useNavigate } from "react-router-dom"

interface ProductPropsType {
    pid?: string,
    name?: string,
    imgUrl?: string,
    price?: number,
    ratings: number,
}

const ProductCard = ({ pid, name, imgUrl, price, ratings }: ProductPropsType) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${pid}`)} className="ProductCardContainer">
            <img src={imgUrl} alt="loading" />
            <div>
                <h3>{name}</h3>

            </div>
            <div>
                <span>₹{price}</span>
                {ratings > 1 && <span>{ratings}⭐</span>}
            </div>
        </div>
    )
}

export default ProductCard