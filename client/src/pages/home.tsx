import ImageBanner from "../components/banner"
import NavBar from "../components/navbar"
import Product from "../components/product"
const Home = () => {
    return (
        <div className="HomeContainer">
            <NavBar />
            <ImageBanner
                title="Welcome to Our Website"
                description="Discover amazing products and services."
            />
            <Product />
        </div>
    )
}

export default Home