import React, { useState } from "react";
import axios from "axios";

const AddPublisher = () => {
    const [name, setName] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Upload image to imgbb
    const uploadImage = async () => {
        if (!logoFile) return null;
        const formData = new FormData();
        formData.append("image", logoFile);

        try {
            setUploading(true);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            setUploading(false);
            return response.data.data.url;
        } catch (error) {
            setUploading(false);
            console.error("Image upload failed:", error);
            setError("Image upload failed. Please try again.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Publisher name is required.");
            return;
        }

        const logoUrl = await uploadImage();
        if (!logoUrl) return;

        try {
            const res = await axios.post("http://localhost:5000/publishers", {
                name: name.trim(),
                logoUrl,
            });
            setSuccess(res.data.message || "Publisher added successfully.");
            setName("");
            setLogoFile(null);
        } catch (error) {
            console.error("Failed to add publisher:", error);
            setError(
                error.response?.data?.message ||
                "Failed to add publisher. Please try again."
            );
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-800">
                Add New Publisher
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Publisher Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter publisher name"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Publisher Logo
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files[0])}
                        required
                        className="w-full file:py-2 file:px-3 file:border-none file:bg-green-600 file:text-white file:rounded-md hover:file:bg-green-700 transition"
                    />
                </div>

                {error && (
                    <p className="text-red-600 font-medium text-sm">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 font-medium text-sm">{success}</p>
                )}

                <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition ${uploading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {uploading ? "Uploading..." : "Add Publisher"}
                </button>
            </form>
        </div>
    );
};

export default AddPublisher;
