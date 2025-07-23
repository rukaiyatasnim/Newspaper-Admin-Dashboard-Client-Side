import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PremiumArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPremiumArticles = async () => {
            try {
                const res = await axios.get('/allArticles');
                const premiumArticles = res.data.filter(article => article.isPremium);
                setArticles(premiumArticles);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchPremiumArticles();
    }, []);

    if (loading) return <div className="text-center text-green-700 mt-20">Loading premium articles...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">Premium Articles</h1>

            {articles.length === 0 ? (
                <p className="text-center text-green-600">No premium articles available.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map(article => (
                        <div
                            key={article._id}
                            className="bg-white rounded-lg shadow-md border border-green-100 hover:shadow-lg transition duration-300 flex flex-col"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-48 w-full object-cover rounded-t-lg"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-xl font-semibold text-green-800 mb-2">{article.title}</h2>
                                <p className="text-green-600 text-sm mb-2">Publisher: <span className="font-medium">{article.publisherName}</span></p>
                                <p className="text-green-700 flex-1">{article.description.slice(0, 100)}{article.description.length > 100 && '...'}</p>

                                <button
                                    onClick={() => navigate(`/allArticlesDetails/${article._id}`)}
                                    className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumArticles;
