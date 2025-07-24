import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios'; // Make sure axios is installed

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                try {
                    const res = await axios.get(`http://localhost:5000/users/role/${currentUser.email}`);
                    setRole(res.data.role); // Make sure your backend sends: { role: 'admin' }
                } catch (error) {
                    console.error('Failed to fetch user role:', error);
                    setRole(null);
                } finally {
                    setRoleLoading(false);
                }
            } else {
                setRole(null);
                setRoleLoading(false);
            }
        });

        return () => {
            unSubscribe();
        };
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
