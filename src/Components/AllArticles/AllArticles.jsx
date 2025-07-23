import React, { useState, useMemo } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const fetchArticles = async ({ queryKey }) => {
    const [_key, { search, publisher, tags }] = queryKey;
    const params = {};
    if (search) params.search = search;
    if (publisher) params.publisher = publisher;
    if (tags && tags.length > 0) params.tags = tags.join(",");
    const { data } = await axios.get("/allArticles", { params });
    return data;
};

const AllArticles = () => {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    const tagsValues = selectedTags.map((t) => t.value);

    const { data: articles = [], isLoading, isError } = useQuery(
        ["articles", { search: searchTerm, publisher: selectedPublisher?.value || "", tags: tagsValues }],
        fetchArticles,
        { keepPreviousData: true }
    );

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
        <div className="max-w-7xl mx-auto p-6 bg-green-50 rounded-lg mt-10">
            <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">All Articles</h1>

            {/* Subscription toggle */}
            <div className="mb-6 flex justify-center gap-4 items-center">
                <label className="font-semibold text-green-800">Subscription:</label>
                <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${isSubscribed
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                >
                    {isSubscribed ? "Subscribed" : "Not Subscribed"}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Search by article title..."
                    className="border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="w-full md:w-1/4">
                    <Select
                        options={publishers}
                        value={selectedPublisher}
                        onChange={setSelectedPublisher}
                        isClearable
                        placeholder="Filter by publisher"
                        className="text-green-900"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <Select
                        options={tagsOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        isMulti
                        placeholder="Filter by tags"
                        className="text-green-900"
                    />
                </div>
            </div>

            {/* Articles list */}
            {isLoading ? (
                <p className="text-center text-green-700">Loading articles...</p>
            ) : isError ? (
                <p className="text-center text-red-600">Failed to load articles.</p>
            ) : articles.length === 0 ? (
                <p className="text-center col-span-full text-green-700 text-lg font-semibold">
                    No articles found matching your criteria.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className={`relative rounded-xl overflow-hidden flex flex-col transition transform hover:scale-[1.02] ${article.isPremium
                                ? "border-2 border-green-500 bg-green-100 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                : "border border-green-300 bg-white shadow-md"
                                }`}
                        >
                            {article.isPremium && (
                                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                                    PREMIUM
                                </div>
                            )}
                            <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-green-900 mb-2">{article.title}</h2>
                                <p className="text-green-700 mb-2 font-medium">
                                    Publisher: {getPublisherName(article.publisher)}
                                </p>
                                <p className="text-green-800 flex-grow">{article.description}</p>
                                <button
                                    onClick={() => handleDetailsClick(article)}
                                    disabled={article.isPremium && !isSubscribed}
                                    className={`mt-4 rounded-full py-2 font-semibold transition w-full ${article.isPremium
                                        ? isSubscribed
                                            ? "bg-green-600 text-white hover:bg-green-700"
                                            : "bg-green-200 text-green-700 cursor-not-allowed"
                                        : "bg-green-700 text-white hover:bg-green-800"
                                        }`}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllArticles;
