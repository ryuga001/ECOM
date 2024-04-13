import NavBar from "../components/navbar"
import Product from "../components/product"
import SideBar from "../components/sidebar"

const Home = () => {
    return (
        <div className="HomeContainer">
            <NavBar />
            <Product />
        </div>
    )
}

export default Home