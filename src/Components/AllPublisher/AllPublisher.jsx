import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Pages/Shared/Loader/Loader"

const AllPublishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/publishers");
                setPublishers(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch publishers:", error);
                setError("Failed to load publishers.");
                setLoading(false);
            }
        };

        fetchPublishers();
    }, []);

    if (loading) {
        return <Loader></Loader>
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    if (publishers.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-600">
                No publishers added yet.
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto mt-16 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center">
                All Publishers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {publishers.map((publisher) => (
                    <div
                        key={publisher._id}
                        className="flex flex-col items-center bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
                    >
                        <img
                            src={publisher.logoUrl}
                            alt={publisher.name}
                            className="w-28 h-28 object-contain mb-4 rounded-lg border border-green-200 shadow-sm"
                        />
                        <p className="text-center text-green-800 font-semibold text-lg">
                            {publisher.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPublishers;
