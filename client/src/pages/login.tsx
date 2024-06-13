import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginPageFormDataType } from "../types/propsType";
import { useGetCurrentUserQuery, useLoginUserMutation, useRegisterUserMutation } from "../store/api";

axios.defaults.withCredentials = true;

const BaseUrl = "http://localhost:5000/api/v1";

const Login = () => {
    const dispatch = useAppDispatch();
    const [registerUser, { isSuccess: registerSuccess }] = useRegisterUserMutation();
    const [loginUser, { isSuccess: loginSuccess }] = useLoginUserMutation();
    const currentUser = useGetCurrentUserQuery();

    const [login, setLogin] = useState<boolean>(true);
    const [ImgUrl, setImgUrl] = useState<string>("../src/assets/defaultProfileImage.png");
    const [formData, setFormData] = useState<LoginPageFormDataType>({
        username: "",
        email: "",
        password: "",
        gender: "male",
    })
    // if (loginSuccess) {
    //     if (user.isSuccess) {
    //         console.log(user.data);
    //     } else {
    //         console.log(user.error)
    //     }
    // }
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

            loginUser({
                email: formData.email,
                password: formData.password,
            })
            if (loginSuccess) {
                currentUser.refetch();
                const user = currentUser?.data?.data;
                dispatch(setUser({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.avatar,
                    role: user.role,
                }))

                user.role === 'admin' ? navigate("/admin") : navigate("/");

            }

        } else {
            const FORMDATA = new FormData();
            FORMDATA.append("username", formData.username);
            FORMDATA.append("email", formData.email);
            FORMDATA.append("password", formData.password);
            FORMDATA.append("gender", formData.gender);
            if (file)
                FORMDATA.append("photo", file);
            registerUser(FORMDATA);
            if (registerSuccess) {
                alert("Your registration was successfull")
            }
        }
    }
    const navigate = useNavigate();
    return (
        <div className="LoginContainer">

            <main>
                <img src="../uploads/loginImage.png" />
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

                                <input id="username" placeholder="username" value={formData.username} name="username" onChange={handleChange} />
                            </div></>
                    }
                    {
                        login && <>
                            <h2>Hello Again!</h2>
                            <p>Welcome back you've been missed!</p>
                        </>
                    }
                    <div>

                        <input type="email" id="email" placeholder="email" value={formData.email} name="email" onChange={handleChange} />
                    </div>
                    <div>

                        <input type="password" id="password" placeholder="password" value={formData.password} name="password" onChange={handleChange} />
                    </div>
                    {
                        !login && <div>

                            <select id="gender" value={formData.gender} name="gender" onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female" >Female</option>
                            </select>
                        </div>
                    }

                    <p onClick={() => setLogin(!login)}>{login ? <>Dont't have an account ? <span> Register</span> </> : <>Already have an account ? <span>Login</span></>}</p>
                    <button>Submit</button>
                </form>
            </main>
        </div >
    )
}

export default Login