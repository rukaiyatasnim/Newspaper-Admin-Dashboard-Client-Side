import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const { signIn } = useAuth();


    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            alert('Login successful!');
            // Optionally navigate to dashboard or homepage
        } catch (error) {
            console.error(error);
            alert(error.message || 'Login failed');
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="w-11/12 md:w-4/12 bg-white p-10 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Login to Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                            {...register("email")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                            {...register("password")}
                        />
                        <label className="label">
                            <Link to="/forgot-password" className="label-text-alt text-green-600 hover:underline">
                                Forgot password?
                            </Link>
                        </label>
                    </div>

                    <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-green-600 font-semibold hover:underline ml-1">
                            Register
                        </Link>
                    </p>

                    <SocialLogin />
                </div>
            </div>
        </section>
    );
};

export default Login;
