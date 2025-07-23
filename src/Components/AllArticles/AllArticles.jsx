import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:5000";

const publishers = [
    { value: "prthom-alo", label: "Prthom Alo" },
    { value: "daily-star", label: "Daily Star" },
    { value: "bdnews24", label: "BDNews24" },
    { value: "jugantor", label: "Jugantor" },
];

const tagsOptions = [
    { value: "politics", label: "Politics" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
];

export default function AllArticles() {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    const { data: articles = [], isLoading, isError } = useQuery({
        queryKey: [
            "articles",
            {
                search: searchTerm,
                publisher: selectedPublisher?.value || "",
                tags: selectedTags.map((t) => t.value),
            },
        ],
        queryFn: async ({ queryKey }) => {
            const [_key, { search, publisher, tags }] = queryKey;
            const params = {};
            if (search) params.search = search;
            if (publisher) params.publisher = publisher;
            if (tags.length > 0) params.tags = tags.join(",");
            const { data } = await axios.get("/allArticles", { params });
            return data;
        },
        keepPreviousData: true,
    });

    const getPublisherName = (val) => {
        const found = publishers.find((p) => p.value === val);
        return found ? found.label : val;
    };

    const handleDetailsClick = (article) => {
        if (article.isPremium && !isSubscribed) {
            alert("You need a subscription to view premium articles.");
            return;
        }
        navigate(`/articles/${article._id}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
                All Articles
            </h1>

            {/* Subscription Toggle */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-5 py-2 rounded-full text-white font-semibold transition ${isSubscribed ? "bg-green-700 hover:bg-green-800" : "bg-gray-400 hover:bg-gray-500"
                        }`}
                >
                    {isSubscribed ? "Subscribed (Click to Unsubscribe)" : "Subscribe for Premium Access"}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
                <div className="relative w-full md:w-1/3">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-green-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <Select
                        options={publishers}
                        value={selectedPublisher}
                        onChange={setSelectedPublisher}
                        isClearable
                        placeholder="Filter by Publisher"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <Select
                        options={tagsOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        isMulti
                        placeholder="Filter by Tags"
                    />
                </div>
            </div>

            {/* Articles */}
            {isLoading ? (
                <p className="text-center text-green-700">Loading articles...</p>
            ) : isError ? (
                <p className="text-center text-red-600">Failed to load articles.</p>
            ) : articles.length === 0 ? (
                <p className="text-center text-green-800 font-semibold">No articles found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className={`flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 ${article.isPremium ? "border-green-600 bg-green-50" : "border-green-200 bg-white"
                                }`}
                        >
                            <div className="relative">
                                {article.isPremium && (
                                    <div className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 text-xs font-semibold rounded flex items-center gap-1 shadow">
                                        <FaCrown className="text-yellow-300" /> Premium
                                    </div>
                                )}
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="h-48 w-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-green-900 mb-2">{article.title}</h2>
                                <p className="text-green-700 mb-1">
                                    Publisher:{" "}
                                    <span className="font-medium">{getPublisherName(article.publisher)}</span>
                                </p>
                                <p className="text-green-800 flex-grow">{article.description}</p>
                                <button
                                    onClick={() => handleDetailsClick(article)}
                                    disabled={article.isPremium && !isSubscribed}
                                    className={`mt-4 px-4 py-2 rounded font-semibold transition ${article.isPremium
                                        ? isSubscribed
                                            ? "bg-green-700 text-white hover:bg-green-800"
                                            : "bg-green-300 text-green-800 cursor-not-allowed"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                >
                                    {article.isPremium && !isSubscribed ? "Subscribe to View" : "View Details"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
