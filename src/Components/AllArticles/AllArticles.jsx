import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import Loader from "../../Pages/Shared/Loader/Loader";

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
    const { user, isPremium } = useAuth();

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
        if (article.isPremium && !isPremium) {
            Swal.fire({
                icon: "info",
                title: "Premium Content",
                text: "This article is for premium members only. Please subscribe to access premium content.",
                confirmButtonText: "OK",
                confirmButtonColor: "#16a34a",
            });
            return;
        }
        navigate(`/articles/${article._id}`);
    };

    if (isLoading) return <Loader></Loader>;
    if (isError) return <p className="text-center text-red-600">Failed to load articles.</p>;

    return (
        <>
            <Helmet>
                <title>All Articles</title>
                <meta name="description" content="Submit your articles and share knowledge on Newsly." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
                    All Articles
                </h1>

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

                {/* Articles or No Articles */}
                {articles.length === 0 ? (
                    <div className="flex justify-center">
                        <div className="max-w-md w-full bg-white border border-green-300 rounded-lg shadow p-8 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto mb-6 h-16 w-16 text-green-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 14l2-2m0 0l2-2m-2 2v6m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-2xl font-semibold text-green-800 mb-2">No Articles Found</h3>
                            <p className="text-green-600">
                                Sorry, we couldn’t find any articles matching your criteria.
                                <br />
                                Please try a different search or filter.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => {
                            const isUserAllowed = !article.isPremium || (article.isPremium && isPremium);
                            return (
                                <div
                                    key={article._id}
                                    className={`flex flex-col border rounded-lg overflow-hidden shadow transition transform hover:-translate-y-1
                                    ${article.isPremium
                                            ? "border-yellow-400 bg-yellow-50 hover:shadow-yellow-400"
                                            : "border-green-200 bg-white hover:shadow-lg"
                                        }`}
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h2 className={`text-xl font-bold mb-2 ${article.isPremium ? "text-yellow-800" : "text-green-900"}`}>
                                            {article.title}
                                            {article.isPremium && (
                                                <span className="ml-2 text-sm font-semibold bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded">
                                                    PREMIUM
                                                </span>
                                            )}
                                        </h2>
                                        <p className={`${article.isPremium ? "text-yellow-700" : "text-green-700"} mb-1`}>
                                            Publisher: <span className="font-medium">{getPublisherName(article.publisher)}</span>
                                        </p>
                                        <p className={`${article.isPremium ? "text-yellow-800" : "text-green-800"} flex-grow`}>
                                            {article.description}
                                        </p>
                                        <button
                                            onClick={() => handleDetailsClick(article)}
                                            disabled={!isUserAllowed}
                                            className={`mt-4 px-4 py-2 rounded font-semibold transition
                                            ${isUserAllowed
                                                    ? article.isPremium
                                                        ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-600"
                                                        : "bg-green-600 text-white hover:bg-green-700"
                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                }`}
                                            title={!isUserAllowed ? "Subscribe to access premium articles" : ""}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
