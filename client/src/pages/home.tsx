import ImageBanner from "../components/banner";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Product from "../components/product";

const Home = () => {
    return (
        <div >
            <NavBar />
            <ImageBanner
                title="Welcome to SHOPPER"
                description="Discover amazing products and services."
            />

            <div className="px-4 sm:px-8 md:px-16 py-12 bg-orange-50">
                <Product />
            </div>
            <Footer />
        </div>

    );
};

export default Home;
