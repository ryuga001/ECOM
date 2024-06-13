import { useState } from "react";
import { SliderType } from "../types/propsType";



const Slider = ({ images }: SliderType) => {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="SliderContainer">
            <main>
                {images && images.map((item, index: number) => (
                    <div onMouseOver={() => setIndex(index)} key={item.imageId}>
                        <img src={item?.url} alt="loading" />
                    </div>
                ))}
            </main >
            <aside>
                <img src={images[index]?.url} alt="loading" />
            </aside>
        </div >
    )
}

export default Slider