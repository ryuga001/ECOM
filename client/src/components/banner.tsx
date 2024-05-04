interface ImageBannerProps {
    imageUrl: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

const ImageBanner = ({ imageUrl, title, description, buttonText, buttonLink }: ImageBannerProps) => {
    return (
        <div className="bannerContainer">
            <div className="image-banner">
                <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}>
                    <img className="image" src="https://www.touchstoneinfotech.com/wp-content/uploads/2022/10/ecommerce-banner.jpg" />
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
