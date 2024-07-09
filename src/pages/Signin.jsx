import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { login } from "../redux/slices/authSlice";

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signinDetails, setSigninDetails] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSigninDetails({
            ...signinDetails,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!signinDetails.email || !signinDetails.password) {
            toast.error("Please fill all the details");
            return;
        }
        if (!isEmail(signinDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }

        const response = await dispatch(login(signinDetails));
        if (response?.payload?.data) {
            navigate("/");
        }
        setSigninDetails({
            email: '',
            password: '',
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] bg-gray-100">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-6 rounded-lg p-8 bg-white shadow-md w-full max-w-md">
                    <h1 className="text-3xl text-center font-bold text-indigo-600">Login</h1>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={signinDetails.email}
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
                            value={signinDetails.password}
                            required
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg text-white rounded-md">
                        Sign In
                    </button>
                    <p className="text-center text-gray-700">
                        Don't have an account? <Link to="/signup" className="cursor-pointer text-indigo-500">Sign up</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signin;
