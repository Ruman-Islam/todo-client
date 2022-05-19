import React, { useEffect } from 'react';
import { GoogleLoginButton } from "react-social-login-buttons";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
    const [signInWithGoogle, googleUser, loading,] = useSignInWithGoogle(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (googleUser) {
            navigate('/todo');
        }
    }, [googleUser, navigate]);

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-body p-5 text-center">
                        <GoogleLoginButton onClick={async () => await signInWithGoogle()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;