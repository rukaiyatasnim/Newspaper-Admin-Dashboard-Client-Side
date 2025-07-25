import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader/Loader";

const AllArticleDashboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [declineModal, setDeclineModal] = useState({ open: false, articleId: null, reason: "" });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get("http://localhost:5000/admin/allArticles");
                setArticles(res.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
                Swal.fire("Error", "Failed to fetch articles.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/admin/articles/${id}/approve`);
            Swal.fire("Approved", "Article approved successfully", "success");
            setArticles(articles.map(article => article._id === id ? { ...article, status: "approved" } : article));
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to approve article", "error");
        }
    };

    const handleDecline = async () => {
        try {
            await axios.patch(`http://localhost:5000/admin/articles/${declineModal.articleId}/decline`, { reason: declineModal.reason });
            Swal.fire("Declined", "Article declined successfully", "success");
            setArticles(articles.map(article => article._id === declineModal.articleId ? { ...article, status: "declined" } : article));
            setDeclineModal({ open: false, articleId: null, reason: "" });
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to decline article", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the article.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/admin/articles/${id}`);
                setArticles(articles.filter(article => article._id !== id));
                Swal.fire("Deleted", "Article deleted successfully", "success");
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to delete article", "error");
            }
        }
    };

    const handleMakePremium = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/admin/articles/${id}/toggle-premium`);
            Swal.fire("Success", "Turned Into Premium", "success");
            setArticles(articles.map(article =>
                article._id === id ? { ...article, isPremium: !article.isPremium } : article
            ));
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to toggle premium status", "error");
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">All Articles (Admin Dashboard)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border rounded shadow text-sm md:text-base">
                    <thead>
                        <tr className="bg-green-700 text-white">
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-left">Publisher</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Premium</th>
                            <th className="p-2 text-left">Posted Date</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => (
                            <tr key={article._id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{article.title}</td>
                                <td className="p-2">{article.publisherName || "Unknown"}</td>
                                <td className="p-2 capitalize">{article.status}</td>
                                <td className="p-2">{article.isPremium ? "Yes" : "No"}</td>
                                <td className="p-2">{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 flex flex-wrap gap-2">
                                    {article.status !== "approved" && (
                                        <button
                                            onClick={() => handleApprove(article._id)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {article.status !== "declined" && (
                                        <button
                                            onClick={() => setDeclineModal({ open: true, articleId: article._id, reason: "" })}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                                        >
                                            Decline
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                    {!article.isPremium && (
                                        <button
                                            onClick={() => handleMakePremium(article._id)}
                                            className={`px-3 py-1 rounded text-white ${article.isPremium ? "bg-gray-600 hover:bg-gray-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
                                        >
                                            {article.isPremium ? "Remove Premium" : "Make Premium"}
                                        </button>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Decline Modal */}
            {declineModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Decline Article</h3>
                        <textarea
                            placeholder="Enter reason for decline"
                            className="w-full border p-2 rounded mb-4 resize-none h-24"
                            value={declineModal.reason}
                            onChange={(e) => setDeclineModal({ ...declineModal, reason: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setDeclineModal({ open: false, articleId: null, reason: "" })}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllArticleDashboard;
