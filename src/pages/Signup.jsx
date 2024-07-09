import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { createAccount } from "../redux/slices/authSlice";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupDetails, setSignupDetails] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    const [previewImage, setPreviewImage] = useState("");

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function handleImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (!uploadedImage) return;
        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!signupDetails.email || !signupDetails.password || !signupDetails.fullName) {
            toast.error("Please fill all the details");
            return;
        }
        if (signupDetails.fullName.length < 5) {
            toast.error("Name should be at least 5 characters");
            return;
        }
        if (!isEmail(signupDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }
        if (!isValidPassword(signupDetails.password)) {
            toast.error("Invalid password provided, password should be 6-16 characters long with at least a number and a special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.data) {
            navigate("/");
        }
        setSignupDetails({
            email: '',
            fullName: '',
            password: '',
            avatar: ''
        });
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] bg-gray-100">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-6 rounded-lg p-8 bg-white shadow-md w-full max-w-md">
                    <h1 className="text-3xl text-center font-bold text-indigo-600">Create Account</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="Profile Preview" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-indigo-600" />
                        )}
                    </label>
                    <input
                        onChange={handleImage}
                        type="file"
                        className="hidden"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="font-semibold text-gray-700">Full Name</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.fullName}
                            required
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.email}
                            required
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.password}
                            required
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg text-white rounded-md">
                        Create Account
                    </button>
                    <p className="text-center text-gray-700">
                        Already have an account? <Link to="/login" className="cursor-pointer text-indigo-500">Login here</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signup;
