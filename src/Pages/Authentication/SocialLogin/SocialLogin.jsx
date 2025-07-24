import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            // Prepare user info for backend
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            };

            // Save user to backend
            await axios.post('http://localhost:5000/users', userInfo);

            // Optionally: redirect or show success message here
            setLoading(false);
        } catch (err) {
            console.error("Google sign in error:", err);
            setError("Failed to login with Google. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="text-center mt-4">
            <span className="mb-4 block text-gray-600 font-semibold">OR</span>

            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="btn bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center mx-auto"
                type="button"
            >
                <svg
                    aria-label="Google logo"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="inline-block mr-2"
                >
                    <path fill="#EA4335" d="M256 133c39.7 0 71.7 16.9 87.9 31.1l64.7-63.2C363 70.6 313.9 48 256 48 156.6 48 75.6 113.4 41 192.4l74 57.5C128.7 192 186.8 133 256 133z" />
                    <path fill="#4285F4" d="M467 216.1c0-14.7-1.3-28.8-3.7-42.3H256v80.1h121.3c-5.3 29-21.4 53.6-45.8 70l71.9 55.9c42.3-38.9 67-96.4 67-163.7z" />
                    <path fill="#FBBC05" d="M115 275.6c-5.6-16.6-5.6-34.5 0-51.1l-74-57.5c-14 27.1-21.9 57.5-21.9 89.9s7.9 62.8 21.9 89.9l74-57.5z" />
                    <path fill="#34A853" d="M256 416c-61 0-113.5-36.8-137.7-88.6l-74 57.5C83.5 423.6 163.9 464 256 464c75 0 138-42.2 170.3-105.5l-71.9-55.9c-21.6 45.3-65.5 77.4-118.4 77.4z" />
                </svg>
                {loading ? 'Signing In...' : 'Login with Google'}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default SocialLogin;
