import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddArticle = () => {
    const { user } = useAuth(); // Get logged-in user email
    const [publishers, setPublishers] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        fetch("http://localhost:5000/publishers")
            .then((res) => res.json())
            .then(setPublishers)
            .catch(console.error);
    }, []);

    const onSubmit = async (data) => {
        if (!user?.email) {
            Swal.fire({
                icon: "error",
                title: "Login Required",
                text: "You must be logged in to submit an article.",
            });
            return;
        }

        try {
            const article = {
                title: data.title,
                description: data.description,
                longDescription: data.longDescription || "",
                publisher: data.publisher, // ObjectId string
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
                image: data.imageUrl,
                isPremium: data.isPremium || false,
                authorEmail: user.email, // required for backend
            };


            const res = await fetch("http://localhost:5000/addArticle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(article),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Submission failed");
            }

            Swal.fire({
                icon: "success",
                title: "Article Submitted",
                text: "Waiting for admin approval.",
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
            });
            reset();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: err.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Add Article</title>
                <meta
                    name="description"
                    content="Submit your articles and share knowledge on BookiQ."
                />
            </Helmet>

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
                <h2 className="text-2xl font-bold text-green-800 mb-6">
                    Submit a New Article
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                        {...register("description", { required: "Description is required" })}
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
                    {errors.tags && <p className="text-red-600">{errors.tags.message}</p>}

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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn bg-green-700 text-white w-full hover:bg-green-800"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Article"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddArticle;
