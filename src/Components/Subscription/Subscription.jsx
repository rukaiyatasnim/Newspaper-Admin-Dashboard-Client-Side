import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        // Store price and duration in localStorage for Payment page
        localStorage.setItem('subscriptionDetails', JSON.stringify({ duration, price }));

        navigate(`/payment/${planId}`);
    };

    return (
        <div className="min-h-screen bg-green-50 py-10">
            <div className="w-11/12 md:w-8/12 mx-auto text-center bg-green-100 p-10 rounded-xl shadow-md">
                <h1 className="text-4xl font-bold text-green-800 mb-4">Unlock Premium News</h1>
                <p className="text-lg text-green-700">
                    Subscribe to get access to exclusive premium articles with high-quality content, trusted sources, and zero ads.
                </p>
            </div>

            <div className="w-11/12 md:w-4/12 mx-auto bg-white mt-10 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Choose Your Plan</h2>

                <div className="form-control mb-5">
                    <label className="label">
                        <span className="label-text text-green-600">Subscription Period</span>
                    </label>
                    <select
                        value={duration}
                        onChange={handleDurationChange}
                        className="select select-bordered border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="1">1 Minute (Test Plan)</option>
                        <option value="5">5 Days</option>
                        <option value="10">10 Days</option>
                    </select>
                </div>

                <div className="mb-6">
                    <p className="text-green-700 font-medium">
                        Price: <span className="text-green-900 font-bold">${price}</span>
                    </p>
                </div>

                <button
                    onClick={handleSubscribe}
                    className="btn bg-green-600 hover:bg-green-700 text-white w-full"
                >
                    Take Subscription
                </button>
            </div>
        </div>
    );
};

export default Subscription;
