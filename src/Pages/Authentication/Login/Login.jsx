import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { signIn } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back to Newsly Newspaper!',
                confirmButtonColor: '#16a34a',
                confirmButtonText: 'Go to Home',
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Invalid credentials or network issue.',
                confirmButtonColor: '#dc2626',
            });
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
                            className={`input input-bordered w-full border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? 'border-red-500' : ''}`}
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Password</span>
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`input input-bordered w-full border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                {...register("password", { required: "Password is required" })}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                        )}

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
