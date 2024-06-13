import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa"
import { HiClipboardList } from "react-icons/hi"
import { IoBag } from "react-icons/io5"
import { MdDashboard } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../store/userSlice"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { useState } from "react"
import { FaSliders } from "react-icons/fa6"

const SideBar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
    const myStyle = {
        width: (!drawerOpen ? "100%" : "fit-content")
    }
    return (
        <>
            <li onClick={() => setDrawerOpen(!drawerOpen)} style={myStyle}> <FaSliders />  {!drawerOpen && 'ADMIN'}</li>
            {/* <li><img src={user.profileImage} /> {!drawerOpen && `${(user.username).toUpperCase()}`}</li> */}
            <li style={myStyle} onClick={() => navigate("/admin")}><MdDashboard /> {!drawerOpen && "Dashboard"}</li>
            <li style={myStyle} onClick={() => navigate("/admin-customer")}><FaUser /> {!drawerOpen && "Customers"}</li>
            <li style={myStyle} onClick={() => navigate("/admin-product")}><IoBag /> {!drawerOpen && "Products"}</li>
            <li style={myStyle} onClick={() => navigate("/admin-order")}> <HiClipboardList /> {!drawerOpen && "Orders"}</li>
            <li style={myStyle} onClick={() => navigate("/")}> <FaHome /> {!drawerOpen && "Home"}</li>
            <li style={myStyle} onClick={() => handleLogout()}><FaSignOutAlt /> {!drawerOpen && "Logout"}</li>
        </>
    )
}

export default SideBar