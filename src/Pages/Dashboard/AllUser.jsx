import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  useAuth  from '../../Hooks/useAuth'; 

const AllUser = () => {
    const { user } = useAuth(); // your context
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const handleMakeAdmin = (id) => {
        axios.patch(`http://localhost:5000/users/make-admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    const updatedUsers = users.map(u =>
                        u._id === id ? { ...u, role: 'admin' } : u
                    );
                    setUsers(updatedUsers);
                }
            })
            .catch(err => console.error('Error making admin:', err));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">All Users</h1>
            <p className="mb-4 text-gray-600">Welcome, {user?.displayName || 'Admin'}</p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Profile</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                            <tr key={u._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4">{idx + 1}</td>
                                <td className="py-3 px-4">
                                    <img src={u.photoURL || 'https://i.ibb.co/2FcLHWp/avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="py-3 px-4">{u.name}</td>
                                <td className="py-3 px-4">{u.email}</td>
                                <td className="py-3 px-4">
                                    {u.role === 'admin' ? (
                                        <span className="text-green-600 font-medium">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(u._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
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
