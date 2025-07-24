import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [isPremium, setIsPremium] = useState(false);
    const [checkingPremium, setCheckingPremium] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    const handleSignOut = () => {
        logOut()
            .then(() =>
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Successful",
                    showConfirmButton: false,
                    timer: 1500,
                })
            )
            .catch((err) => console.error(err));
    };

    // Fetch user info and check premium
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) {
                setIsPremium(false);
                setUserInfo(null);
                setCheckingPremium(false);
                setLoadingUserInfo(false);
                return;
            }

            try {
                const { data } = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
                setUserInfo(data);

                const premiumDate = new Date(data.premiumTaken);
                const now = new Date();

                setIsPremium(data.premiumTaken && premiumDate > now);
            } catch (error) {
                console.error("Error fetching user info:", error);
                setIsPremium(false);
                setUserInfo(null);
            } finally {
                setCheckingPremium(false);
                setLoadingUserInfo(false);
            }
        };

        fetchUserData();
    }, [user, axiosSecure]);

    // Nav links JSX for reuse
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/addArticle"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    Add Articles
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allArticle"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    All Articles
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/subscription"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    Subscription
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/myArticles"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    My Articles
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                    }
                >
                    My Profile
                </NavLink>
            </li>
            {isPremium && !checkingPremium && (
                <li>
                    <NavLink
                        to="/PremiumArticles"
                        className={({ isActive }) =>
                            isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                        }
                    >
                        Premium Articles
                    </NavLink>
                </li>
            )}
            {!loadingUserInfo && userInfo?.role === "admin" && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "text-green-700 font-bold" : "hover:text-green-600 transition"
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                        role="button"
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-3 shadow-lg"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-2xl font-extrabold tracking-wide text-green-700">
                    BookiQ
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            <div className="navbar-end flex items-center space-x-4">
                {user ? (
                    <>
                        <div className="relative flex flex-col items-center group">
                            <img
                                src={
                                    user.photoURL ||
                                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                                }
                                alt={user.displayName || "User Avatar"}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-600"
                                title={user.displayName || user.email}
                            />
                            <span className="absolute top-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {user.displayName}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="btn btn-outline btn-error text-black hover:bg-red-100"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="btn btn-outline btn-success hover:bg-green-600 hover:text-white"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn btn-success hover:bg-green-700 text-white"
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
