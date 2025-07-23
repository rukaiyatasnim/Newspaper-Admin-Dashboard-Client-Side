import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-green-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg border-r border-green-200 p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-8">Admin Dashboard</h2>
                <ul className="space-y-5 text-green-700 font-medium">
                    <li>
                        <Link
                            to="/dashboard"
                            className="block px-4 py-2 rounded hover:bg-green-100 transition-colors"
                        >
                            Dashboard Overview
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/allUser"
                            className="block px-4 py-2 rounded hover:bg-green-100 transition-colors"
                        >
                            All Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/allArticleDashboard"
                            className="block px-4 py-2 rounded hover:bg-green-100 transition-colors"
                        >
                            All Articles
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/addPublisher"
                            className="block px-4 py-2 rounded hover:bg-green-100 transition-colors"
                        >
                            Add Publisher
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content area */}
            <div className="flex-1 p-10 space-y-10">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
