import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
interface FormDataType {
    username: string,
    email: string,
    password: string,
    profileImage?: string,
}

const Login = () => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        profileImage: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (login) {
            const res = await axios.post("http://localhost:5000/api/v1/user/login", {
                email: formData.email,
                password: formData.password,
            })
            if (res.data.success) {
                const response = await axios.get("http://localhost:5000/api/v1/user/me",
                    { withCredentials: true }
                );

                if (response.data.success) {
                    console.log(response.data);
                    const user = response.data.data;
                    dispatch(setUser({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        profileImage: user.avatar,
                        role: user.role,
                    }))
                    navigate("/")
                }
            }

        }
    }
    const navigate = useNavigate();
    return (
        <div className="LoginContainer">
            {/* <Link to="/">Home</Link> */}
            <form onSubmit={handleSubmit}>
                {
                    !login && <div>
                        <label htmlFor="username">Name</label>
                        <input id="username" placeholder="username" value={formData.username} name="username" onChange={handleChange} />
                    </div>
                }
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="email" value={formData.email} name="email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" placeholder="password" value={formData.password} name="password" onChange={handleChange} />
                </div>
                <p onClick={() => setLogin(!login)}>{login === true ? "Register" : "Login"}</p>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login