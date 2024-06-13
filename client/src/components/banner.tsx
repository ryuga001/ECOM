import { useEffect, useState } from "react";
import { ImageBannerProps } from "../types/propsType";



const ImageBanner = ({ title, description }: ImageBannerProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = [

        "../src/assets/bannerImage1.png",
        "../src/assets/bannerImage2.png",
        "../src/assets/bannerImage3.png",
    ]
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [images.length]);
    return (
        <div className="bannerContainer">
            <div className="image-banner">
                <div className="image"  >
                    <img className="image" src={images[currentSlide]} />
                    <div className="overlay"></div>
                    <div className="content">
                        <h2>{title}</h2>
                        <p>{description}</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageBanner;
