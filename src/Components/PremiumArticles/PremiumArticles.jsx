import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const PremiumArticles = () => {
    const { user, loading: authLoading } = useAuth();

    const [articles, setArticles] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) {
            // Don't fetch yet, wait for auth to finish loading
            return;
        }

        if (!user?.email) {
            setError('User email missing');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
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
                setError('Failed to load data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure, user, authLoading]);

    if (authLoading || loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!userInfo?.premiumTaken || new Date(userInfo.premiumTaken) <= new Date()) {
        return <div>You do not have an active premium subscription.</div>;
    }

    return (
        <div>
            <h2>Premium Articles</h2>
            {articles.length === 0 ? (
                <p>No premium articles available.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem' }}>
                    {articles.map((article) => (
                        <div key={article._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <h3>{article.title}</h3>
                            <p>Publisher: {article.publisherName}</p>
                            <p>{article.description}</p>
                            <button onClick={() => navigate(`/articles/${article._id}`)}>Details</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumArticles;
