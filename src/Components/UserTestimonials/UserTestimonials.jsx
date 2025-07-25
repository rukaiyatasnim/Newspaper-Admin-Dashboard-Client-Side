import React from "react";

const testimonials = [
    {
        name: "Rafiq Hasan",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        feedback:
            "Newsly has transformed how I stay updated with news. The premium content is top-notch!",
    },
    {
        name: "Sabrina Akter",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        feedback:
            "I love the clean design and easy navigation. Finding articles on my favorite topics is so simple.",
    },
    {
        name: "Tariq Rahman",
        photo: "https://randomuser.me/api/portraits/men/65.jpg",
        feedback:
            "The subscription plans are affordable and worth every penny. Highly recommend for news lovers.",
    },
    {
        name: "Moushumi Begum",
        photo: "https://randomuser.me/api/portraits/women/55.jpg",
        feedback:
            "Great variety of publishers and insightful articles. I read it daily with my morning tea.",
    },
];

export default function UserTestimonials() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-green-50 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
                What Our Users Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {testimonials.map(({ name, photo, feedback }, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={photo}
                                alt={name}
                                className="w-14 h-14 rounded-full mr-4 border-2 border-green-300"
                            />
                            <h3 className="text-xl font-semibold text-green-900">{name}</h3>
                        </div>
                        <p className="text-green-700 italic">"{feedback}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
