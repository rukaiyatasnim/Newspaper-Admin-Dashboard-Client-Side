import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const PremiumArticles = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!user?.email) {
            setError('User email not found.');
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);

                const { data: userData } = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
                setUserInfo(userData);

                const premiumDate = new Date(userData.premiumTaken);
                const now = new Date();

                if (userData.premiumTaken && premiumDate > now) {
                    const { data: premiumArticles } = await axiosSecure.get('/premiumArticles');
                    setArticles(premiumArticles);
                } else {
                    setArticles([]);
                }

                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load premium articles.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, axiosSecure, authLoading]);

    if (authLoading || loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!userInfo?.premiumTaken || new Date(userInfo.premiumTaken) <= new Date()) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <div className="bg-red-100 border border-red-300 p-10 rounded-lg max-w-md w-full shadow">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-red-700 mb-3">No Active Premium Subscription</h2>
                    <p className="text-red-600 mb-6">
                        Subscribe now to unlock exclusive premium articles.
                    </p>
                    <button
                        onClick={() => navigate('/subscription')}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition"
                    >
                        Go to Subscription
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-semibold text-center text-green-800 mb-8">
                🌿 Premium Articles
            </h1>
            {articles.length === 0 ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 max-w-md w-full text-center">
                        <div className="text-5xl mb-4">📭</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            No Premium Content Yet
                        </h2>
                        <p className="text-gray-600">
                            Currently, there are no premium articles available. Please check back later!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className="bg-white rounded-lg shadow border border-green-200 p-4"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-40 w-full object-cover rounded mb-4"
                            />
                            <h3 className="text-xl font-bold text-green-800">{article.title}</h3>
                            <p className="text-sm text-gray-600">
                                <strong>Publisher:</strong> {article.publisherName}
                            </p>
                            <p className="my-2 text-gray-700">{article.description}</p>
                            <button
                                onClick={() => navigate(`/articles/${article._id}`)}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-2"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumArticles;
