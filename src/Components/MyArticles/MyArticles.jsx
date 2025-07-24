import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import NoArticlesBanner from "./NoArticleBanner";

const MyArticles = () => {
    const { user, loading: authLoading } = useAuth();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [publishers, setPublishers] = useState([]);

    // Modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editArticleId, setEditArticleId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (authLoading || !user?.email) return;

        const fetchArticles = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/myArticles/${user.email.toLowerCase()}`
                );
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load articles.");
                setLoading(false);
            }
        };

        fetchArticles();
    }, [user, authLoading]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/publishers")
            .then((res) => setPublishers(res.data))
            .catch(() => { });
    }, []);

    const openEditModal = (article) => {
        setEditArticleId(article._id);

        setValue("title", article.title);
        setValue("description", article.description);
        setValue("longDescription", article.longDescription || "");
        setValue("publisher", article.publisherId || article.publisher || "");
        setValue("tags", article.tags ? article.tags.join(", ") : "");
        setValue("imageUrl", article.image || "");
        setValue("isPremium", article.isPremium || false);

        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditArticleId(null);
        reset();
    };

    const onUpdateSubmit = async (data) => {
        if (!editArticleId) return;

        try {
            const updatedData = {
                title: data.title,
                description: data.description,
                longDescription: data.longDescription || "",
                publisher: data.publisher,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
                image: data.imageUrl,
                isPremium: data.isPremium || false,
            };

            await axios.patch(
                `http://localhost:5000/articles/${editArticleId}`,
                updatedData
            );

            setArticles((prev) =>
                prev.map((art) =>
                    art._id === editArticleId
                        ? { ...art, ...updatedData, publisherId: updatedData.publisher }
                        : art
                )
            );

            alert("Article updated successfully");
            closeEditModal();
        } catch (error) {
            alert("Failed to update article: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await axios.delete(`http://localhost:5000/articles/${id}`);
                setArticles((prev) => prev.filter((a) => a._id !== id));
            } catch {
                alert("Failed to delete article.");
            }
        }
    };

    if (authLoading || loading)
        return (
            <p className="text-center mt-10 text-green-700 font-semibold">
                Loading articles...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
        );

    if (articles.length === 0)
        return <NoArticlesBanner />;

    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
                My Articles
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border border-green-200">
                    <thead className="bg-green-100 text-green-800">
                        <tr>
                            <th className="py-3 px-4 border border-green-200">#</th>
                            <th className="py-3 px-4 border border-green-200 text-left">Title</th>
                            <th className="py-3 px-4 border border-green-200">Status</th>
                            <th className="py-3 px-4 border border-green-200">Premium</th>
                            <th className="py-3 px-4 border border-green-200">Update</th>
                            <th className="py-3 px-4 border border-green-200">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {articles.map((article, idx) => (
                            <tr
                                key={article._id}
                                className={`${idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
                                    } hover:bg-green-200 transition`}
                            >
                                <td className="py-2 px-4 border border-green-200 text-center">
                                    {idx + 1}
                                </td>

                                <td className="py-2 px-4 border border-green-200 max-w-xs truncate">
                                    {article.title}
                                </td>

                                <td className="py-2 px-4 border border-green-200 text-center font-semibold">
                                    {article.status === "approved" ? (
                                        <span className="text-green-700">Approved</span>
                                    ) : article.status === "declined" ? (
                                        <span className="text-red-600">Declined</span>
                                    ) : (
                                        <span className="text-yellow-600">Pending</span>
                                    )}
                                </td>

                                <td className="py-2 px-4 border border-green-200 text-center font-semibold">
                                    {article.isPremium ? (
                                        <span className="text-green-700">Yes</span>
                                    ) : (
                                        <span className="text-gray-600">No</span>
                                    )}
                                </td>

                                <td className="py-2 px-4 border border-green-200 text-center">
                                    <button
                                        onClick={() => openEditModal(article)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                    >
                                        Update
                                    </button>
                                </td>

                                <td className="py-2 px-4 border border-green-200 text-center">
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg relative">
                        <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">
                            Update Article
                        </h3>
                        <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <p className="text-red-600">{errors.title.message}</p>
                            )}

                            <textarea
                                placeholder="Short Description"
                                className="textarea textarea-bordered w-full"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-600">{errors.description.message}</p>
                            )}

                            <textarea
                                placeholder="Long Description (optional)"
                                className="textarea textarea-bordered w-full"
                                {...register("longDescription")}
                            />

                            <select
                                className="input input-bordered w-full"
                                {...register("publisher", { required: "Publisher is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select Publisher
                                </option>
                                {publishers.map((pub) => (
                                    <option key={pub._id} value={pub._id}>
                                        {pub.name}
                                    </option>
                                ))}
                            </select>
                            {errors.publisher && (
                                <p className="text-red-600">{errors.publisher.message}</p>
                            )}

                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                className="input input-bordered w-full"
                                {...register("tags", { required: "At least one tag is required" })}
                            />
                            {errors.tags && (
                                <p className="text-red-600">{errors.tags.message}</p>
                            )}

                            <input
                                type="text"
                                placeholder="Image URL"
                                className="input input-bordered w-full"
                                {...register("imageUrl", { required: "Image URL is required" })}
                            />
                            {errors.imageUrl && (
                                <p className="text-red-600">{errors.imageUrl.message}</p>
                            )}

                            <div className="flex items-center gap-2">
                                <input type="checkbox" {...register("isPremium")} />
                                <label>Premium Article</label>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="btn btn-outline px-6"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn bg-green-700 text-white px-6 hover:bg-green-800"
                                >
                                    {isSubmitting ? "Updating..." : "Update Article"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArticles;
