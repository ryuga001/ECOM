import React, { memo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import imageicon from "../assets/defaultProfileImage.png";
import loginImage from "../assets/loginImage.png";

import { getCurrentUser, loginUser, registerUser } from "../route";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { LoginPageFormDataType } from "../types/propsType";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [formData, setFormData] = useState<LoginPageFormDataType>({
        username: "",
        email: "",
        password: "",
        gender: "male",
    });
    const [imageIcon, setImageIcon] = useState<string>(imageicon);
    const [showpassword, setShowpassword] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setImageIcon(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (login) {
            try {
                const loginResponse = await loginUser({ email: formData.email, password: formData.password });
                if (loginResponse) {
                    const userResponse = await getCurrentUser();
                    const user = userResponse.data;
                    dispatch(setUser({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        profileImage: user.avatar,
                        role: user.role,
                    }));
                    user.role === "admin" ? navigate("/admin") : navigate("/");
                }
            } catch (error) {
                setError("Login failed! Please check your credentials.");
            }
        } else {
            try {
                const formDataObj = new FormData();
                formDataObj.append("username", formData.username);
                formDataObj.append("email", formData.email);
                formDataObj.append("password", formData.password);
                formDataObj.append("gender", formData.gender);
                if (file) formDataObj.append("photo", file);

                const registerResponse = await registerUser(formDataObj);
                if (registerResponse) {
                    alert("Registration successful!");
                    setLogin(true);
                }
            } catch (error) {
                setError("Registration failed! Please try again.");
            }
        }
        setLoading(false);
    };

    const toggleLogin = () => setLogin((prev) => !prev);

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50 py-3">
            <div className="lg:w-1/2 m-4 w-full bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
                <div className="w-full h-full">
                    <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover rounded-l-lg" />
                </div>
                <div className="w-full p-4">
                    <div className="flex justify-end cursor-pointer">
                        <span><HiHome size={20} onClick={() => navigate('/')} /></span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                        {login ? "Welcome Back!" : "Create an Account"}
                    </h2>
                    <p className="text-gray-500 text-center mb-6">
                        {login ? "Sign in to continue" : "Register to get started"}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!login && (
                            <div className="flex items-center justify-center mb-4">
                                <label className="relative cursor-pointer">
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                    <img src={imageIcon} alt="avatar" className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100">
                                        <span className="text-white">Change</span>
                                    </div>
                                </label>
                            </div>
                        )}
                        {!login && (
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        )}
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus-within:ring focus-within:ring-blue-500">
                            <input
                                type={showpassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-full focus:outline-none"
                                autoComplete="current-password"
                            />
                            <button type="button" onClick={() => setShowpassword(!showpassword)} className="text-gray-500 hover:text-gray-700">
                                {showpassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {!login && (
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-center text-gray-500 mt-4">
                        {login ? (
                            <>
                                Don't have an account?{" "}
                                <span onClick={toggleLogin} className="text-blue-500 cursor-pointer">Register</span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span onClick={toggleLogin} className="text-blue-500 cursor-pointer">Login</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(Login);
