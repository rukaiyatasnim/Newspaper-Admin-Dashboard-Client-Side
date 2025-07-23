import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000/users', {
                name: data.name,
                email: data.email,
                photo: data.photo,
                password: data.password,
                role: 'user',
            });
            alert(res.data.message || 'Registered successfully!');
        } catch (err) {
            console.error(err);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
                    Register
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-semibold text-green-700">
                            Name
                        </label>
                        <input
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-500' : 'border-green-300'
                                }`}
                            placeholder="Your full name"
                        />
                        {errors.name && (
                            <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-semibold text-green-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? 'border-red-500' : 'border-green-300'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="photo" className="block mb-1 font-semibold text-green-700">
                            Photo URL (optional)
                        </label>
                        <input
                            id="photo"
                            {...register('photo')}
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-semibold text-green-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.password ? 'border-red-500' : 'border-green-300'
                                }`}
                            placeholder="Your password"
                        />
                        {errors.password && (
                            <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300"
                    >
                        Register
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Already Have an Account?
                        <Link to="/login" className="text-green-600 font-semibold hover:underline ml-1">
                            Login
                        </Link>
                        <SocialLogin></SocialLogin>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
