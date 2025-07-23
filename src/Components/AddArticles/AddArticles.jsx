import React from "react";
import { useForm, Controller } from "react-hook-form";

const AddArticle = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const article = {
                title: data.title,
                description: data.description,
                longDescription: data.longDescription || "",
                publisher: data.publisher,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
                image: data.imageUrl,
                isPremium: data.isPremium || false,
            };

            console.log("Submitting article:", article);

            // Replace with your backend endpoint
            await fetch("http://localhost:5000/addArticle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(article),
            });

            alert("Article submitted! Waiting for admin approval.");
            reset();
        } catch (err) {
            alert("Submission failed: " + err.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Submit a New Article</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}

                <textarea
                    placeholder="Short Description"
                    className="textarea textarea-bordered w-full"
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}

                <textarea
                    placeholder="Long Description (optional)"
                    className="textarea textarea-bordered w-full"
                    {...register("longDescription")}
                />

                <input
                    type="text"
                    placeholder="Publisher Name"
                    className="input input-bordered w-full"
                    {...register("publisher", { required: "Publisher is required" })}
                />
                {errors.publisher && <p className="text-red-600">{errors.publisher.message}</p>}

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
                {errors.imageUrl && <p className="text-red-600">{errors.imageUrl.message}</p>}

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
    );
};

export default AddArticle;
