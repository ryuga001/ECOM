import { useEffect, useState } from "react";
import { ImageBannerProps } from "../types/propsType";

const ImageBanner = ({ title, description }: ImageBannerProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = [
        "../src/assets/bannerImage1.png",
        "../src/assets/bannerImage2.png",
        "../src/assets/bannerImage3.png",
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, [images.length]);

    return (
        <div className="relative  w-full h-screen">
            {/* Image Slider */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
                    src={images[currentSlide]}
                    alt="Banner Image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex justify-center items-center text-center text-white p-6 sm:p-8 md:p-12">
                <div className="relative z-10 space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-100">{title}</h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200">{description}</p>
                    <button className="px-6 py-3 bg-orange-600 text-white text-lg font-medium rounded-lg hover:bg-orange-700 transition-colors duration-300">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageBanner;
