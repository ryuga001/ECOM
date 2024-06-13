import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import axios from "axios";
import { setUser } from "../store/userSlice";
import { useLogoutUserQuery } from "../store/api";


const BaseUrl = "http://localhost:5000/api/v1";

const NavBar = () => {
    const navigate = useNavigate();
    const cartProducts = useAppSelector((state) => state.cart.cartProduct);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const [logoutCalled, setLogoutCalled] = useState<boolean>(false);


    const logoutUser = useLogoutUserQuery({
        skip: !logoutCalled
    });

    const handleLogout = () => {
        // const res = await axios.get(`${BaseUrl}/user/logout`);
        // if (res.data.success) {
        setLogoutCalled(true);
        if (logoutUser.isSuccess) {
            dispatch(setUser({
                id: "",
                username: "",
                email: "",
                profileImage: "",
                role: "",
            }))
            navigate("/login")
        }
    }

    return (
        <>
            <nav className="NavBarContainer">
                <div>
                    <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>ECOM</h2>
                </div>

                <div >
                    <CgShoppingCart onClick={() => navigate("/cart")} style={{ cursor: "pointer" }} size={30} />
                    {
                        cartProducts.length > 0 && <span>{cartProducts.length}</span>
                    }
                    <div>
                        {user.profileImage ? <img onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} src={user.profileImage} style={{ height: "3rem", width: "3rem", cursor: "pointer", borderRadius: "1rem" }} /> : <RiLoginBoxFill size={35} onClick={() => navigate("/login")} style={{ cursor: "pointer" }} />}
                        <div>
                            <dialog onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} open={isOpen}>

                                <ul>
                                    {user.role === "admin" ? <li><Link to="/admin">Dashboard</Link></li> : <li><Link to="/myorders">MyOrders</Link></li>}
                                    <li onClick={() => handleLogout()}>Logout</li>
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