import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loader from "../../Pages/Shared/Loader/Loader";

axios.defaults.baseURL = "http://localhost:5000";

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
                const filtered = data.filter(article => article.views > 0);
                setArticles(filtered.slice(0, 7));
            } catch (err) {
                console.error(err);
                setError("Failed to load trending articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading)
        return <Loader></Loader>

    if (error)
        return (
            <p className="text-center mt-10 text-red-600 font-medium">
                {error}
            </p>
        );

    if (!articles.length)
        return (
            <div className="flex flex-col items-center justify-center mt-20 mb-20 px-4 text-center">
                <div className="bg-green-50 border border-green-200 rounded-3xl p-10 max-w-xl w-full shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                        🚫 No Trending Articles Found
                    </h2>
                    <p className="text-green-700 mb-6">
                        Looks like there are no articles trending at the moment.
                        Check back later for fresh, popular reads!
                    </p>
                    <button
                        onClick={() => navigate("/addArticle")}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow transition-all duration-200"
                    >
                        Go to Add Article
                    </button>
                </div>
            </div>
        );

    return (
        <div className="w-full bg-[#e8f5e9] dark:bg-[#1e3b2b] py-14">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-100 mb-10 text-center">
                🔥 Trending Articles
            </h2>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 4500 }}
                pagination={{ clickable: true }}
                loop
            >
                {articles.map(({ _id, title, image, publisherName, views }) => (
                    <SwiperSlide key={_id}>
                        <div
                            onClick={() => navigate(`/articles/${_id}`)}
                            className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-green-100 overflow-hidden max-w-5xl mx-auto"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl md:text-2xl font-semibold text-green-900 mb-2">
                                    {title}
                                </h3>
                                <div className="flex justify-center gap-4 items-center text-sm">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        📰 {publisherName}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                                        <FiEye /> {views}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TrendingArticles;
