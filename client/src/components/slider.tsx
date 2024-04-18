import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface imgaeType {
    imageId?: string,
    url: string,
}

interface SliderType {
    images: Array<imgaeType>
}

const Slider = ({ images }: SliderType) => {
    const [index, setIndex] = useState(0);
    const increment = () => {
        if (index == 4) setIndex(0);
        else setIndex(index + 1);
    }
    const decrement = () => {
        if (index == 0) setIndex(4);
        else setIndex(index - 1);
    }
    return (
        <div className="SliderContainer">
            <img src={images[index].url} />
            {/* <p>{images[index].url}</p> */}
            <div>
                <FaArrowCircleLeft style={{ cursor: "pointer" }} onClick={decrement} size={30} />
                <button>{index + 1}</button>
                <FaArrowCircleRight style={{ cursor: "pointer" }} onClick={increment} size={30} />
            </div>
        </div>
    )
}

export default Slider