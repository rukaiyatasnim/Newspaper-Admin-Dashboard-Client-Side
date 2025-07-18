import React from 'react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'per month',
        features: [
            'Access to limited articles',
            'Basic support',
            'Single device access',
        ],
        btnText: 'Get Started',
    },
    {
        name: 'Basic',
        price: '$5',
        period: 'per month',
        features: [
            'Unlimited article access',
            'Standard support',
            'Access on multiple devices',
            'Ad-free experience',
        ],
        btnText: 'Subscribe Now',
    },
    {
        name: 'Premium',
        price: '$15',
        period: 'per month',
        features: [
            'All Basic features',
            'Exclusive premium articles',
            'Priority support',
            'Offline reading',
            'Monthly newsletter',
        ],
        btnText: 'Go Premium',
    },
];

const Plans = () => {
    return (
        <section className="py-20 bg-green-200 px-4">
            <div className="max-w-[91.6667%] mx-auto text-center mb-16">
                <h2 className="text-4xl font-bold text-green-900 mb-4">Choose Your Plan</h2>
                <p className="text-green-800 max-w-3xl mx-auto">
                    Find the best plan to fit your reading habits and unlock premium features.
                </p>
            </div>

            <div className="max-w-[91.6667%] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
                {plans.map(({ name, price, period, features, btnText }, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-green-900 mb-2">{name}</h3>
                            <div className="text-5xl font-extrabold text-green-900 mb-1">{price}</div>
                            <div className="text-green-800 mb-6">{period}</div>

                            <ul className="mb-6 text-left text-green-800 space-y-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <svg
                                            className="w-6 h-6 mr-2 text-green-700 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className={`w-full rounded-full py-3 font-semibold transition-colors duration-300
                ${idx === 1
                                    ? 'border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white'
                                    : 'bg-green-700 text-white hover:bg-green-800'
                                }
              `}
                        >
                            {btnText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Plans;
