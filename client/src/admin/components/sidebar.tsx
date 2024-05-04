import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa"
import { HiClipboardList } from "react-icons/hi"
import { IoBag } from "react-icons/io5"
import { MdDashboard } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../store/userSlice"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../store/hook"

const SideBar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/user/logout");
        if (res.data.success) {
            dispatch(setUser({
                id: "",
                username: "",
                email: "",
                profileImage: "",
                role: "",
            }))
            navigate("/login");
        }
    }
    return (
        <>
            <li><img src={user.profileImage} /> {(user.username).toUpperCase()}</li>
            <li onClick={() => navigate("/admin")}><MdDashboard /> Dashboard</li>
            <li onClick={() => navigate("/admin-customer")}><FaUser /> Customers</li>
            <li onClick={() => navigate("/admin-product")}><IoBag /> Products</li>
            <li onClick={() => navigate("/admin-order")}> <HiClipboardList /> Orders</li>
            <li onClick={() => navigate("/")}> <FaHome /> Home</li>
            <li onClick={() => handleLogout()}><FaSignOutAlt /> Logout</li>
        </>
    )
}

export default SideBar