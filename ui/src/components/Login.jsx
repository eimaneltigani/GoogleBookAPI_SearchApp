import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/store/sessionSlice';
import { getCurrentUser, signUp, signIn } from 'aws-amplify/auth';

import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user1 = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(''); // Clear previous errors

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    setErrors('Passwords do not match');
                    return;
                }
                const response = await signUp({
                    username: email,
                    password: password,
                    options: {
                        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
                    }
                });

                // if signing up, need to add user to database
                console.log(response);
                // dispatch(setAuthUser(user));
            } else {
                console.log(email);
                const response = await signIn({
                    username: email,
                    password: password
                });
                console.log(response);
                // dispatch(setAuthUser(user));
            }

            // set isDirty as true
            // navigate to home page
        } catch (error) {
            setErrors(error.message || 'An error occured during authentication.');
        }
    }
    // dispatch(setAuthUser(null));

    return (
        <div className="mainBlock">
            {errors && <div className="Error"> {errors} </div>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="regField"
                    placeholder="Enter email:"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    className="regField"
                    placeholder="Enter password:"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && 
                    <input 
                        type="password"
                        className="regField"
                        placeholder="Enter confirm password:"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                }
                <button type="submit" className="submitBtn">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
            </form>
            <div className="form-tag">
                {isSignUp ? (
                    <p>
                        Have an account?{" "}
                        <button 
                            className="linkBtn" 
                            onClick={() => {
                                setIsSignUp(false);
                                setErrors("");
                            }}
                        >
                            Sign In
                        </button>
                    </p>
                ) : (
                    <p>
                        Not registered?{" "} 
                        <button 
                            className="linkBtn" 
                            onClick={() => {
                                setIsSignUp(true);
                                setErrors("");
                            }}
                        >
                            Sign Up
                        </button>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login;