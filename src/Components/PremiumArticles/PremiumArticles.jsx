import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PremiumArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const checkSubscriptionAndFetch = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (!userData) {
                    navigate('/subscription');
                    return;
                }

                const res = await axiosSecure.get(`/users/${userData.email}`);
                const premiumExpiry = res.data?.premiumTaken || 0;

                if (Date.now() > premiumExpiry) {
                    navigate('/subscription');
                    return;
                }

                const articleRes = await axiosSecure.get('/allArticles');
                const premiumArticles = articleRes.data.filter(article => article.isPremium);
                setArticles(premiumArticles);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        checkSubscriptionAndFetch();
    }, [navigate, axiosSecure]);

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
                            className="bg-green-50 rounded-lg shadow hover:shadow-md transition duration-300 border border-green-200 flex flex-col overflow-hidden"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-xl font-bold text-green-900 mb-2">{article.title}</h2>
                                <p className="text-green-700 text-sm mb-2">
                                    Publisher: <span className="font-medium">{article.publisherName}</span>
                                </p>
                                <p className="text-green-800 flex-1 text-sm">
                                    {article.description.slice(0, 100)}{article.description.length > 100 && '...'}
                                </p>
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
