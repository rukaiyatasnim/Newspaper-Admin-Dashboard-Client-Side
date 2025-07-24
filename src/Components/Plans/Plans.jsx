import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Plans = () => {
    const navigate = useNavigate();

    const handleSubscribeClick = () => {
        navigate("/subscription");
    };

    return (
        <div className="w-11/12 mx-auto mt-16 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center">
                Choose Your Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl shadow p-8 flex flex-col justify-between hover:shadow-lg transition min-h-[450px]">
                    <div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                            Free Plan
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Read Free Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                View Trending Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Submit 1 Article
                            </li>
                            <li className="flex items-center text-red-600">
                                <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />
                                Access Premium Articles
                            </li>
                            <li className="flex items-center text-red-600">
                                <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />
                                Unlimited Articles
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={handleSubscribeClick}
                        className="mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Upgrade to Premium
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-2xl shadow p-8 flex flex-col justify-between hover:shadow-lg transition min-h-[450px]">
                    <div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                            Premium Plan
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Read All Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                View Trending Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Submit Unlimited Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Access Premium Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Priority Article Approval
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={handleSubscribeClick}
                        className="mt-6 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
                    >
                        Subscribe Now
                    </button>
                </div>

                {/* Lifetime Plan */}
                <div className="bg-gradient-to-br from-green-200 to-green-300 border border-green-400 rounded-2xl shadow p-8 flex flex-col justify-between hover:shadow-lg transition min-h-[450px]">
                    <div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                            Lifetime Plan
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                All Premium Features
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Lifetime Access
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Submit Unlimited Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Access Premium Articles
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                                Priority Support
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={handleSubscribeClick}
                        className="mt-6 bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition"
                    >
                        Get Lifetime Access
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Plans;
