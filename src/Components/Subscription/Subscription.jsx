import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

const Subscription = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState("1");
    const [price, setPrice] = useState(5); // price in $

    const handleDurationChange = (e) => {
        const val = e.target.value;
        setDuration(val);

        if (val === "1") setPrice(5);
        else if (val === "5") setPrice(15);
        else if (val === "10") setPrice(25);
    };

    const handleSubscribe = () => {
        let planId = "";
        if (duration === "1") planId = "1min";
        else if (duration === "5") planId = "5days";
        else if (duration === "10") planId = "10days";

        localStorage.setItem('subscriptionDetails', JSON.stringify({ duration, price }));
        navigate(`/payment/${planId}`);
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">

            {/* Banner */}
            <div className="relative bg-green-600 text-white rounded-xl shadow-lg w-full max-w-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                        <SparklesIcon className="h-8 w-8 text-yellow-300" />
                        Unlock Premium Access
                    </h1>
                    <p className="mt-2 text-green-100">
                        Enjoy exclusive, ad-free, high-quality articles tailored for your interests.
                    </p>
                </div>
                <img
                    src="https://i.ibb.co/LXSRZ65D/images.jpg"
                    alt="Premium"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-300 shadow-inner object-cover"
                />
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-green-800 text-center mb-6">Choose Your Plan</h2>

                <div className="mb-5">
                    <label className="block mb-2 text-green-700 font-medium">
                        Subscription Period
                    </label>
                    <select
                        value={duration}
                        onChange={handleDurationChange}
                        className="w-full border border-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="1">1 Minute (Test Plan)</option>
                        <option value="5">5 Days</option>
                        <option value="10">10 Days</option>
                    </select>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-green-700 font-semibold">Total Price:</span>
                    <span className="text-green-900 font-bold text-lg">${price}</span>
                </div>

                <button
                    onClick={handleSubscribe}
                    className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-md w-full flex justify-center items-center gap-2"
                >
                    <CheckCircleIcon className="h-5 w-5" />
                    Take Subscription
                </button>
            </div>
        </div>
    );
};

export default Subscription;
