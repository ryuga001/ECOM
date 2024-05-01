import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DefaultProfileAvator from "../assets/defaultProfileImage.png"
axios.defaults.withCredentials = true;
interface FormDataType {
    username: string,
    email: string,
    password: string,
    gender: string,
}

const Login = () => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<boolean>(false);
    const [ImgUrl, setImgUrl] = useState<string>("../src/assets/defaultProfileImage.png");
    const [formData, setFormData] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        gender: "male",
    })
    const [file, setFile] = useState<File | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    // console.log(response.data);
                    const user = response.data.data;
                    dispatch(setUser({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        profileImage: user.avatar,
                        role: user.role,
                    }))
                    user.role === 'admin' ? navigate("/admin") : navigate("/");
                }
            }

        } else {
            const FORMDATA = new FormData();
            FORMDATA.append("username", formData.username);
            FORMDATA.append("email", formData.email);
            FORMDATA.append("password", formData.password);
            FORMDATA.append("gender", formData.gender);
            if (file)
                FORMDATA.append("photo", file);
            console.log(formData);
            const res = await axios.post("http://localhost:5000/api/v1/user/register", FORMDATA);
            if (res.data.success) {
                alert(res.data.message);
            }
        }
    }
    const navigate = useNavigate();
    return (
        <div className="LoginContainer">
            {/* <Link to="/">Home</Link> */}
            <form onSubmit={handleSubmit}>
                {
                    !login && <>
                        <div className="UserProfileImageOption">

                            <div className="personal-image">
                                <label className="label">
                                    <input name="file" type="file" onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            const file = files[0];
                                            setFile(file);
                                        }
                                    }} />
                                    <figure className="personal-figure">
                                        <img src={ImgUrl} className="personal-avatar" alt="avatar" />
                                        <figcaption className="personal-figcaption">
                                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                                        </figcaption>
                                    </figure>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username">Name</label>
                            <input id="username" placeholder="username" value={formData.username} name="username" onChange={handleChange} />
                        </div></>
                }
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="email" value={formData.email} name="email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" placeholder="password" value={formData.password} name="password" onChange={handleChange} />
                </div>
                {
                    !login && <div>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" value={formData.gender} name="gender" onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female" >Female</option>
                        </select>
                    </div>
                }
                <p onClick={() => setLogin(!login)}>{login === true ? "Register" : "Login"}</p>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login