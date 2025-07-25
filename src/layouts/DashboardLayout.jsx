import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
    const getLinkClass = ({ isActive }) =>
        `block px-4 py-2 rounded transition-colors cursor-pointer ${isActive
            ? "text-blue-700 bg-green-100 font-semibold"
            : "text-black hover:bg-green-100"
        }`;

    return (
        <div className="flex min-h-screen bg-green-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg border-r border-green-200 p-6 flex flex-col">
                {/* Sidebar Title with blue text */}
                <h2 className="text-3xl font-extrabold text-blue-600 mb-8 select-none">
                    Admin Dashboard
                </h2>

                {/* Navigation Links */}
                <ul className="space-y-5 font-medium flex-grow">
                    <li>
                        <NavLink to="/dashboard" className={getLinkClass}>
                            Dashboard Overview
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allUser" className={getLinkClass}>
                            All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allArticleDashboard" className={getLinkClass}>
                            All Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addPublisher" className={getLinkClass}>
                            Add Publisher
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1 p-10 space-y-10 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
