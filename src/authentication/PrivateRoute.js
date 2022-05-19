import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import auth from '../firebase/firebaseConfig';

const PrivateRoute = ({ children }) => {
    const [user, loading,] = useAuthState(auth);

    if (loading) { // Preventing redirecting to login page //
        return <Spinner />
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return children;
};

export default PrivateRoute;