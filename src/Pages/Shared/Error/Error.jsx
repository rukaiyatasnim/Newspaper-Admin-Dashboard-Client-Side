import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 text-center">
                <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    Oops! Page not found.
                </h2>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
