import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() =>
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Successful",
                    showConfirmButton: false,
                    timer: 1500
                })
            )
            .catch((err) => console.log(err));
    };

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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/addArticle">Add Articles</Link></li>
                        <li><Link to="/allArticle">All Articles</Link></li>
                        <li><Link to="/subscription">Subscription</Link></li>
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
                            className={({ isActive }) => (isActive ? "text-green-700 font-bold" : "")}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/addArticle"
                            className={({ isActive }) => (isActive ? "text-green-700 font-bold" : "")}
                        >
                            Add Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allArticle"
                            className={({ isActive }) => (isActive ? "text-green-700  font-bold" : "")}
                        >
                            All Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/subscription"
                            className={({ isActive }) => (isActive ? "text-green-700  font-bold" : "")}
                        >
                            Subscription
                        </NavLink>
                    </li>
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
                        <NavLink to="/signIn" className="btn">
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