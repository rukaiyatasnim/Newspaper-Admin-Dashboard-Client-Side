import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AllArticlesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-10">
            <h1 className="text-4xl font-bold mb-6 text-green-900">
                Article Details - ID: {id}
            </h1>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-64 bg-green-100 rounded-md flex items-center justify-center mb-6">
                    {/* Placeholder for article image */}
                    <span className="text-green-400 italic text-lg">Image will appear here</span>
                </div>

                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                    Article Title Placeholder
                </h2>

                <p className="text-green-700 mb-4">
                    Publisher: <span className="font-medium">Publisher Name</span>
                </p>

                <p className="text-green-800 leading-relaxed mb-6">
                    This is where the detailed article description will go. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <button
                    className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition"
                    onClick={() => navigate('/allArticle')}
                >
                    Back to Articles
                </button>
            </div>
        </div>
    );
};

export default AllArticlesDetails;
