import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Profile = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm();

    // Fetch user data with encoded email
    const { data: serverUser, isLoading } = useQuery({
        queryKey: ["userProfile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const encodedEmail = encodeURIComponent(user.email);
            const res = await axios.get(`http://localhost:5000/users/${encodedEmail}`);
            reset(res.data); // preload form fields
            return res.data;
        },
    });

    // Mutation to update profile
    const updateProfile = useMutation({
        mutationFn: async (data) => {
            const encodedEmail = encodeURIComponent(user.email);
            return await axios.put(`http://localhost:5000/users/${encodedEmail}`, data);
        },
        onSuccess: () => {
            alert("Profile updated successfully!");
            queryClient.invalidateQueries(["userProfile", user.email]);
        },
        onError: () => {
            alert("Failed to update profile.");
        },
    });

    const onSubmit = async (data) => {
        let imageUrl = serverUser?.image || null;

        // Upload new image if selected
        if (data.image && data.image[0]) {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            imageUrl = imgbbRes.data.data.url;
        }

        const updatedData = {
            name: data.name,
            image: imageUrl,
            email: user.email.toLowerCase(),
        };

        updateProfile.mutate(updatedData);
    };

    if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white shadow-md p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">My Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="label-text text-green-700">Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("name")}
                        required
                    />
                </div>

                <div>
                    <label className="label-text text-green-700">Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        value={user?.email}
                        disabled
                    />
                </div>

                <div>
                    <label className="label-text text-green-700">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="file-input file-input-bordered w-full"
                    />
                    {serverUser?.image && (
                        <img
                            src={serverUser.image}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mt-3"
                        />
                    )}
                </div>

                <button
                    className="btn w-full bg-green-600 text-white hover:bg-green-700"
                    type="submit"
                    disabled={updateProfile.isLoading}
                >
                    {updateProfile.isLoading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
