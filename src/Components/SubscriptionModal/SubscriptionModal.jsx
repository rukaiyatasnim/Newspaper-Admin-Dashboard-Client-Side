import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionModal = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); // show after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleSubscribe = () => {
        setShowModal(false);
        navigate("/subscription");
    };

    if (!showModal) return null;

    return (
        <div className="fixed bottom-10 right-10 z-50 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-5">
            <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowModal(false)}
            >
                &times;
            </button>
            <h2 className="text-lg font-bold text-green-800 mb-2">
                Unlock Premium Features!
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
                Subscribe now to access premium articles and post without limits.
            </p>
            <button
                onClick={handleSubscribe}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
                Go to Subscription Page
            </button>
        </div>
    );
};

export default SubscriptionModal;
