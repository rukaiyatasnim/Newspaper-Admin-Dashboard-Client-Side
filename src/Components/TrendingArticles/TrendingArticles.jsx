import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; // Your backend base URL

const TrendingArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/articles/trending");
                setArticles(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load trending articles.");
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading)
        return <p className="text-center mt-10 text-green-700">Loading trending articles...</p>;

    if (error)
        return <p className="text-center mt-10 text-red-600">{error}</p>;

    if (!articles.length)
        return <p className="text-center mt-10 text-gray-500">No trending articles found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
                Trending Articles
            </h2>
            <ul className="space-y-6">
                {articles.map(({ _id, title, image, publisherName, views }) => (
                    <li
                        key={_id}
                        onClick={() => navigate(`/article/${_id}`)}
                        className="cursor-pointer flex items-center gap-4 p-4 border border-green-200 rounded-lg hover:shadow-md hover:border-green-400 transition"
                    >
                        <img
                            src={image}
                            alt={title}
                            className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-green-700">{title}</h3>
                            <p className="text-green-600 text-sm">Publisher: {publisherName}</p>
                            <p className="text-green-500 text-sm font-medium">Views: {views}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingArticles;
