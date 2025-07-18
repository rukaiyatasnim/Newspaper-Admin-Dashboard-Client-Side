import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
    const stats = [
        { label: "Total Users", value: 12500 },
        { label: "Normal Users", value: 9300 },
        { label: "Premium Users", value: 3200 },
        { label: "Articles Published", value: 4800 },
    ];

    return (
        <section className="py-20 bg-green-50 px-4">
            <div className="max-w-[91.6667%] mx-auto"> {/* 11/12 width */}
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 leading-tight">
                        User & Platform Statistics
                    </h1>
                    <p className="text-lg md:text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
                        Track the growth and engagement of our newspaper community and content.
                    </p>
                </div>

                {/* Stats Grid: 4 items, center aligned */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                    {stats.map(({ label, value }, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="text-5xl font-extrabold text-green-800 mb-2">
                                <CountUp end={value} duration={3} separator="," />+
                            </div>
                            <h3 className="text-lg font-semibold text-green-700">{label}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
