import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Set your backend base URL here if needed
axios.defaults.baseURL = "http://localhost:5000";

const AllArticlesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get(`/articles/${id}`);
                setArticle(data);

                // Increment views
                await axios.patch(`/articles/${id}/views`);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load article details.");
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <p className="text-center mt-20 text-green-700">Loading article details...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
    if (!article) return <p className="text-center mt-20 text-green-700">Article not found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
                {article.title}
            </h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <p className="text-green-700 mb-2 font-medium">
                        Publisher:{" "}
                        <span className="font-semibold">
                            {article.publisherName || article.publisher}
                        </span>
                    </p>

                    <p className="text-green-800 leading-relaxed mb-4 whitespace-pre-line">
                        {article.longDescription || article.description || "No description available."}
                    </p>

                    <p className="text-green-600 mb-4 font-semibold">
                        Views: {article.views || 0}
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate("/allArticle")}
                            className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition"
                        >
                            Back to Articles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllArticlesDetails;
