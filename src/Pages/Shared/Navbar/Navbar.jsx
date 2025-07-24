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
            .catch((err) => console.log(err));
    };

    // Check premium status
    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (!user?.email) {
                setIsPremium(false);
                setCheckingPremium(false);
                return;
            }

            try {
                setCheckingPremium(true);
                const { data: userInfo } = await axiosSecure.get(
                    `/users/${encodeURIComponent(user.email)}`
                );
                const premiumDate = new Date(userInfo.premiumTaken);
                const now = new Date();

                if (userInfo.premiumTaken && premiumDate > now) {
                    setIsPremium(true);
                } else {
                    setIsPremium(false);
                }
            } catch (error) {
                console.error("Error checking premium status:", error);
                setIsPremium(false);
            } finally {
                setCheckingPremium(false);
            }
        };

        checkPremiumStatus();
    }, [user, axiosSecure]);

    // Fetch full user info including role
    useEffect(() => {
        if (!user?.email) {
            setUserInfo(null);
            setLoadingUserInfo(false);
            return;
        }

        setLoadingUserInfo(true);
        axiosSecure
            .get(`/users/${encodeURIComponent(user.email)}`)
            .then(({ data }) => setUserInfo(data))
            .catch((error) => {
                console.error("Error fetching user info:", error);
                setUserInfo(null);
            })
            .finally(() => setLoadingUserInfo(false));
    }, [user, axiosSecure]);

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addArticle">Add Articles</Link>
                        </li>
                        <li>
                            <Link to="/allArticle">All Articles</Link>
                        </li>
                        <li>
                            <Link to="/subscription">Subscription</Link>
                        </li>
                        <li>
                            <Link to="/profile">My Profile</Link>
                        </li>
                        {isPremium && !checkingPremium && (
                            <li>
                                <Link to="/PremiumArticles">Premium Articles</Link>
                            </li>
                        )}
                        {!loadingUserInfo && userInfo?.role === "admin" && (
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    BookiQ
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-green-700 font-bold" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/addArticle"
                            className={({ isActive }) =>
                                isActive ? "text-green-700 font-bold" : ""
                            }
                        >
                            Add Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allArticle"
                            className={({ isActive }) =>
                                isActive ? "text-green-700 font-bold" : ""
                            }
                        >
                            All Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/subscription"
                            className={({ isActive }) =>
                                isActive ? "text-green-700 font-bold" : ""
                            }
                        >
                            Subscription
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "text-green-700 font-bold" : ""
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
                                    isActive ? "text-green-700 font-bold" : ""
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
                                    isActive ? "text-green-700 font-bold" : ""
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>

            <div className="navbar-end flex items-center space-x-3">
                {user ? (
                    <>
                        <div className="relative flex flex-col items-center group">
                            <img
                                src={
                                    user.photoURL ||
                                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                                }
                                alt={user.displayName || "User Avatar"}
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <div className="absolute top-12 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {user.displayName}
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="btn btn-outline btn-error text-black"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="btn">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="btn">
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
