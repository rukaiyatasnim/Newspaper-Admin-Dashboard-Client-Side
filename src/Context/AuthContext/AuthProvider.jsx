import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    // Save user to DB if new
    const saveUserToDB = async (currentUser) => {
        if (!currentUser?.email) return;

        const email = currentUser.email.toLowerCase();
        const userInfo = {
            email,
            name: currentUser.displayName || "Anonymous",
            photo: currentUser.photoURL || null,
        };

        try {
            // Check if user already exists
            const res = await axios.get(`http://localhost:5000/users/${email}`);
            // If user found, do nothing
            if (res?.data?.email) return;
        } catch (error) {
            // If 404 Not Found, then create new user
            if (error.response?.status === 404) {
                try {
                    await axios.post('http://localhost:5000/users', userInfo);
                } catch (postError) {
                    console.error("Error saving new user to DB:", postError);
                }
            } else {
                console.error("Error checking user in DB:", error);
            }
        }
    };

    // Create user and update profile with name
    const createUser = async (email, password, name) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update Firebase profile with display name
            await updateProfile(userCredential.user, { displayName: name });

            // Save user to backend DB
            await saveUserToDB(userCredential.user);

            return userCredential;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Usually user is saved already, no need to save here
            return userCredential;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const currentUser = result.user;
            await saveUserToDB(currentUser);
            return result;
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    // Handle auth state changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                try {
                    const res = await axios.get(`http://localhost:5000/users/role/${currentUser.email.toLowerCase()}`);
                    setRole(res.data.role);
                } catch (err) {
                    console.error("Error fetching role:", err);
                    setRole(null);
                } finally {
                    setRoleLoading(false);
                }
            } else {
                setRole(null);
                setRoleLoading(false);
            }
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        role,
        roleLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
