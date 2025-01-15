import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../route";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearUser } from "../store/userSlice";

const NavBar = () => {
    const navigate = useNavigate();
    const cartProducts = useAppSelector((state) => state.cart.cartProduct);
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const response = await logoutUser();
        if (response) {
            dispatch((clearUser()));
            navigate("/login");
        }
    };

    return (
        <nav className="bg-black shadow-lg w-full z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h2
                    className="text-2xl font-bold text-white cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    SHOPPER
                </h2>


                <div className="flex items-center space-x-6">

                    <div className="relative">
                        <CgShoppingCart
                            onClick={() => navigate("/cart")}
                            className="text-3xl text-white cursor-pointer hover:text-orange-400"
                        />
                        {cartProducts.length > 0 && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartProducts.length}
                            </span>
                        )}
                    </div>


                    <div className="relative">
                        {user.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-green-500 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        )}


                        {isOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-dark border border-blue-300 rounded-md shadow-lg"
                                style={{ zIndex: "1" }}
                            >
                                <ul className="py-2">
                                    {user.role === "admin" ? (
                                        <li>
                                            <Link
                                                to="/admin"
                                                className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link
                                                to="/myorders"
                                                className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                                            >
                                                My Orders
                                            </Link>
                                        </li>
                                    )}
                                    <li
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
