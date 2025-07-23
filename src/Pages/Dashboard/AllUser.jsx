import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AllUser = () => {
    const queryClient = useQueryClient();

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users");
            return res.data;
        },
    });

    // Make admin
    const { mutate: makeAdmin } = useMutation({
        mutationFn: async (id) => {
            return await axios.patch(`http://localhost:5000/users/admin/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });

    if (isLoading) return <p className="text-center">Loading users...</p>;

    return (
        <div className="p-6 bg-green-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-green-800">All Users</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-green-100 text-left text-green-700">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Photo</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id} className="border-b hover:bg-green-50">
                                <td className="py-3 px-4">{idx + 1}</td>
                                <td className="py-3 px-4">
                                    <img
                                        src={user.photo || "https://i.ibb.co/jTVyYJ2/user.png"}
                                        alt="User"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">
                                    {user.role === "admin" ? (
                                        <span className="text-green-600 font-semibold">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => makeAdmin(user._id)}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
