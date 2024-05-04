import ImageBanner from "../components/banner"
import NavBar from "../components/navbar"
import Product from "../components/product"
// import BannerImage from "../assets/Banner.png"
const Home = () => {
    return (
        <div className="HomeContainer">
            <NavBar />
            <ImageBanner
                imageUrl="https://www.touchstoneinfotech.com/wp-content/uploads/2022/10/ecommerce-banner.jpg"
                title="Welcome to Our Website"
                description="Discover amazing products and services."
                buttonText="Explore"
                buttonLink="/products"
            />
            <Product />
        </div>
    )
}

export default Home