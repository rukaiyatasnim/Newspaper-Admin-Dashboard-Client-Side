import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set your backend base URL here if needed
axios.defaults.baseURL = 'http://localhost:5000';

const AllArticlesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/articles/${id}`);
                setArticle(res.data);

                await axios.patch(`/articles/${id}/views`);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load article details.');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-green-700">Loading article details...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
    if (!article) return <div className="text-center mt-20 text-green-700">Article not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-10">
            <h1 className="text-4xl font-bold mb-6 text-green-900">{article.title}</h1>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <img
                    src={article.image}
                    alt={article.title}
                    className="h-64 w-full object-cover rounded-md mb-6"
                />

                <p className="text-green-700 mb-4">
                    Publisher: <span className="font-medium">{article.publisherName || article.publisher}</span>
                </p>

                <p className="text-green-800 leading-relaxed mb-6 whitespace-pre-line">
                    {article.longDescription || article.description || 'No description available.'}
                </p>

                <p className="text-green-600 mb-4 font-semibold">
                    Views: {article.views || 0}
                </p>

                <button
                    className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition"
                    onClick={() => navigate('/allArticle')}
                >
                    Back to Articles
                </button>
            </div>
        </div>
    );
};

export default AllArticlesDetails;
