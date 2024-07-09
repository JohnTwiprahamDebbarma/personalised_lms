import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdDashboardCustomize, MdHome, MdChat, MdGrade, MdSchedule, MdInfo, MdContactMail, MdExitToApp, MdPerson } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import { logout } from '../redux/slices/authSlice';

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function onLogout(e) {
        e.preventDefault();

        const response = await dispatch(logout());
        if (response?.payload?.data)
            navigate("/");
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="drawer absolute left-0 z-50 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <FiMenu onClick={changeWidth} size={"32px"} className="font-bold text-indigo-400 m-4" />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-6 w-60 h-[100%] sm:w-80 bg-slate-200 text-black relative text-lg font-medium">
                        <li className="w-fit absolute right-2 z-50 hover:bg-indigo-300 rounded-full duration-300">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/">
                                <MdHome />
                                Home
                            </Link>
                        </li>
                        {isLoggedIn && role === "ADMIN" && (
                            <li className="hover:bg-indigo-300 rounded-full duration-300">
                                <Link to="/admin/dashboard">
                                    <MdDashboardCustomize />
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/dashboard">
                                <MdDashboardCustomize />
                                Dashboard
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/courses">
                                <FaBook />
                                Courses
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/chats">
                                <MdChat />
                                Chats
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/grades">
                                <MdGrade />
                                Grades
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/schedule">
                                <MdSchedule />
                                Schedule
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/resumegenerator">
                                <FaSheetPlastic />
                                Resume Generator
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/about">
                                <MdInfo />
                                About us
                            </Link>
                        </li>
                        <li className="hover:bg-indigo-300 rounded-full duration-300">
                            <Link to="/contact">
                                <MdContactMail />
                                Contact Us
                            </Link>
                        </li>

                        {!isLoggedIn ? (
                            <li className="absolute bottom-4 w-[85%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary bg-green-400 px-5 py-3 font-semibold rounded-full w-full">
                                        <Link to="/signin">Login</Link>
                                    </button>
                                    <button className="btn-secondary bg-indigo-400 px-5 py-3 font-semibold rounded-full w-full">
                                        <Link to="/signup">Sign Up</Link>
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary px-4 py-1 font-semibold rounded-full w-full">
                                        <Link to="/user/profile">
                                            <MdPerson />
                                            Profile
                                        </Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-semibold rounded-full w-full">
                                        <Link onClick={onLogout}>
                                            <MdExitToApp />
                                            Logout
                                        </Link>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;
