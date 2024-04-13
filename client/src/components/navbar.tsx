import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { PiUserCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";



const NavBar = () => {
    const navigate = useNavigate();
    const cartProducts = useAppSelector((state) => state.cartProduct);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <nav className="NavBarContainer">
                <div>
                    <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Ecommerce</h2>
                </div>

                <div >
                    <CgShoppingCart onClick={() => navigate("/cart")} style={{ cursor: "pointer" }} size={30} />
                    <span>{cartProducts.length}</span>
                    <div>
                        <PiUserCircleFill onClick={() => setIsOpen(!isOpen)} size={45} style={{ cursor: "pointer" }} />
                        <div>
                            <dialog open={isOpen}>

                                <ul>
                                    <li>MyProfile</li>
                                    <li>MyOrders</li>
                                    <li>Logout</li>
                                </ul>

                            </dialog>
                        </div>
                    </div>
                </div>

            </nav >
            {/* <div className="BannerContainer">
                <img src="" alt="banner" />
            </div> */}
        </>
    )
}

export default NavBar