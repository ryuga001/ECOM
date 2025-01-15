import { useState } from "react";
import { SliderType } from "../types/propsType";

const Slider = ({ images }: SliderType) => {
    const [index, setIndex] = useState<number>(0);

    return (
        <div className="flex  flex-row gap-6 p-6 w-full">
            {/* Thumbnails Section */}
            <main className="flex gap-1 flex-col">
                {images && images.map((item, idx: number) => (
                    <div
                        key={item.imageId}
                        className={`flex-shrink-0 cursor-pointer transition-transform transform hover:scale-110 duration-200`}
                        onMouseOver={() => setIndex(idx)}
                    >
                        <img
                            src={item?.url}
                            alt={`image-${idx}`}
                            className="w-24 h-24 object-fit "
                        />
                    </div>
                ))}
            </main>

            {/* Main Image Display */}
            <aside className="flex justify-center items-center w-full  h-100 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <img
                    src={images[index]?.url}
                    alt="Product Main"
                    className="w-full h-full object-cover transition-transform duration-500"
                />
            </aside>
        </div>
    );
};

export default Slider;
