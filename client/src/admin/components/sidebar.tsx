import { useState } from "react";
import { FaHome, FaSignOutAlt, FaSlidersH, FaUser } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { IoBag } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../route";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { clearUser } from "../../store/userSlice";

const SideBar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const response = await logoutUser();
        if (response) {
            dispatch((clearUser()));
            navigate("/login");
        }
    };
    return (
        <aside
            className={`bg-white shadow-md h-screen flex flex-col items-center w-[max-content] px-2 transition-all duration-300`}
        >

            <div
                className="w-full flex items-center justify-start p-4 cursor-pointer"
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                <FaSlidersH className="text-gray-600 text-xl" />

            </div>


            <div className="w-full flex flex-col items-center mt-4">
                {user.profileImage && (
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="rounded-full w-16 h-16 object-cover"
                    />
                )}
                {!drawerOpen && user.username && (
                    <span className="hidden md:block text-gray-700 mt-2 text-sm font-medium">
                        {user.username.toUpperCase()}
                    </span>
                )}
            </div>


            <ul className="flex flex-col w-full mt-6 space-y-2">
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/admin")}
                >
                    <MdDashboard className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Dashboard</span>}
                </li>
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/admin-customer")}
                >
                    <FaUser className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Customers</span>}
                </li>
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/admin-product")}
                >
                    <IoBag className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Products</span>}
                </li>
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/admin-order")}
                >
                    <HiClipboardList className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Orders</span>}
                </li>
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <FaHome className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Home</span>}
                </li>
                <li
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="text-xl text-gray-600" />
                    {drawerOpen && <span className="ml-4 text-gray-700">Logout</span>}
                </li>
            </ul>
        </aside>
    );
};

export default SideBar;
