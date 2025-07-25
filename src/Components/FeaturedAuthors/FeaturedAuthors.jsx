import React from "react";

const mockAuthors = [
    {
        name: "Afsana Rahman",
        image: "https://i.pravatar.cc/150?img=4",
        articles: 12,
        bio: "Covers politics & social justice.",
    },
    {
        name: "Rezaul Karim",
        image: "https://i.pravatar.cc/150?img=8",
        articles: 18,
        bio: "Writes about tech & innovation.",
    },
    {
        name: "Shila Akter",
        image: "https://i.pravatar.cc/150?img=5",
        articles: 9,
        bio: "Specializes in sports journalism.",
    },
    {
        name: "Tanvir Hasan",
        image: "https://i.pravatar.cc/150?img=9",
        articles: 14,
        bio: "Health & wellness contributor.",
    },
    {
        name: "Mehzabin Alam",
        image: "https://i.pravatar.cc/150?img=7",
        articles: 11,
        bio: "Focuses on education & youth.",
    },
    {
        name: "Zubair Hossain",
        image: "https://i.pravatar.cc/150?img=6",
        articles: 20,
        bio: "Explores business & economy topics.",
    },
];

export default function FeaturedAuthors() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Featured Authors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mockAuthors.map((author, idx) => (
                    <div key={idx} className="bg-white border border-green-200 rounded-xl shadow p-6 text-center">
                        <img
                            src={author.image}
                            alt={author.name}
                            className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-300"
                        />
                        <h3 className="text-xl font-semibold text-green-800">{author.name}</h3>
                        <p className="text-green-600 text-sm mb-2">{author.bio}</p>
                        <p className="text-sm text-gray-600">
                            Articles: <span className="font-bold">{author.articles}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
