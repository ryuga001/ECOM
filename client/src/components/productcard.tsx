import { useNavigate } from "react-router-dom";
import { ProductPropsType } from "../types/propsType";

const ProductCard = ({ pid, name, imgUrl, price, ratings }: ProductPropsType) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${pid}`)}
            className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl max-w-xs m-4 h-full flex flex-col"
        >
            <div className="relative overflow-hidden flex-shrink-0">
                <img
                    src={imgUrl}
                    alt={name}
                    className="w-full h-48 object-fit transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-bold text-pink-600">₹{price}</span>
                    {ratings > 1 && (
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={i < ratings ? 'text-yellow-500' : 'text-gray-300'}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
