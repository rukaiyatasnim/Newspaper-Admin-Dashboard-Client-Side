import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader/Loader";

const AllUser = () => {
    const queryClient = useQueryClient();

    // Fetch all users
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users");
            return res.data;
        },
    });

    // Mutation to update user role
    const { mutate: updateRole, isLoading: isUpdatingRole } = useMutation({
        mutationFn: async ({ id, role }) => {
            return await axios.patch(`http://localhost:5000/users/update-role/${id}`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "User role updated successfully!",
                timer: 1500,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to update user role. Please try again.",
            });
        },
    });

    const handleRoleChange = (user, newRole) => {
        Swal.fire({
            title: newRole === "admin"
                ? `Make ${user.name} an admin?`
                : `Demote ${user.name} to user?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: newRole === "admin" ? "#16a34a" : "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: newRole === "admin" ? "Yes, make admin" : "Yes, make user",
        }).then((result) => {
            if (result.isConfirmed) {
                updateRole({ id: user._id, role: newRole });
            }
        });
    };

    if (isLoading) return <Loader></Loader>;
    if (isError)
        return (
            <p className="text-center text-red-600">
                Error loading users: {error.message}
            </p>
        );

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
                            <th className="py-3 px-4">Action</th>
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
                                <td className="py-3 px-4 font-semibold">
                                    {user.role === "admin" ? (
                                        <span className="text-green-600">Admin</span>
                                    ) : (
                                        <span>User</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {user.role !== "admin" ? (
                                        <button
                                            onClick={() => handleRoleChange(user, "admin")}
                                            disabled={isUpdatingRole}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isUpdatingRole ? "Processing..." : "Make Admin"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRoleChange(user, "user")}
                                            disabled={isUpdatingRole}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isUpdatingRole ? "Processing..." : "Make User"}
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