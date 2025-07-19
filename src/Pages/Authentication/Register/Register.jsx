import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            {...register("name")}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="input input-bordered w-full"
                            {...register("email")}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-700">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Choose a password"
                            className="input input-bordered w-full"
                            {...register("password")}
                            required
                        />
                    </div>

                    <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full">
                        Register
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?
                        <Link to="/login" className="text-green-600 font-semibold hover:underline ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;
