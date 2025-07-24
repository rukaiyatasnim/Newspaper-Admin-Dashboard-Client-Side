import React from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Statistics = () => {
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading statistics...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Error loading statistics</p>;

    const totalUsers = users.length;

    const now = new Date();
    const premiumUsers = users.filter(user => {
        if (!user.premiumTaken) return false;
        const premiumDate = new Date(user.premiumTaken);
        return premiumDate > now;
    }).length;

    const normalUsers = totalUsers - premiumUsers;

    return (
        <div className="max-w-7xl mx-auto my-10 w-11/12">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-green-800 mb-2">
                    User Statistics
                </h1>
                <p className="text-green-600 text-lg max-w-xl mx-auto">
                    Overview of total, normal, and premium users on the platform.
                </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-green-50 rounded-lg p-8 shadow">
                {/* Total Users */}
                <div className="stat bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow">
                    <div className="stat-title text-green-700 text-lg font-semibold mb-2">Total Users</div>
                    <div className="stat-value text-green-900 text-4xl font-bold">
                        <CountUp end={totalUsers} duration={2} />
                    </div>
                </div>

                {/* Normal Users */}
                <div className="stat bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow">
                    <div className="stat-title text-green-700 text-lg font-semibold mb-2">Normal Users</div>
                    <div className="stat-value text-green-900 text-4xl font-bold">
                        <CountUp end={normalUsers} duration={2} />
                    </div>
                </div>

                {/* Premium Users */}
                <div className="stat bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow">
                    <div className="stat-title text-green-700 text-lg font-semibold mb-2">Premium Users</div>
                    <div className="stat-value text-green-900 text-4xl font-bold">
                        <CountUp end={premiumUsers} duration={2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
