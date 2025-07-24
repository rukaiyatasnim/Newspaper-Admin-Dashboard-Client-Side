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
        if (authLoading) return;

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
        <div style={{ padding: '2rem', backgroundColor: '#e6f4ea', minHeight: '100vh' }}>
            <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '2rem' }}>🌿 Premium Articles</h2>
            {articles.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#388e3c' }}>No premium articles available.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            style={{
                                backgroundColor: '#f1f8f4',
                                border: '1px solid #a5d6a7',
                                padding: '1.2rem',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.15)'
                            }}
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                    marginBottom: '1rem'
                                }}
                            />
                            <h3 style={{ color: '#2e7d32' }}>{article.title}</h3>
                            <p><strong>Publisher:</strong> {article.publisherName}</p>
                            <p>{article.description}</p>
                            <button
                                onClick={() => navigate(`/articles/${article._id}`)}
                                style={{
                                    backgroundColor: '#66bb6a',
                                    border: 'none',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    marginTop: '0.5rem'
                                }}
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
