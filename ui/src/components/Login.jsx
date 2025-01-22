import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(''); // Clear previous errors

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    setErrors('Passwords do not match');
                    return;
                }
                const { user } = await signUp({
                    username: email,
                    password: password
                });
                dispatch(setAuthUser(user));
            } else {
                const { user } = await signIn({
                    username: email,
                    password: password
                });
                dispatch(setAuthUser(user));
            }

            dispatch(setAuthUser(userId));
            console.log(userId);
        } catch (error) {
            setErrors(error.message || 'An error occured during authentication.');
        }
    }


    const handleAuthStateChange = async (authState) => {

        if (authState === "signedIn") {
          try {
            // Get user information after successful sign-in
            const { username, userId, signInDetails } = await getCurrentUser();
            console.log(`The username: ${username}`);
            console.log(`The userId: ${userId}`);
            console.log(`The signInDetails: ${signInDetails}`);

            // need to pull favorites from database
            // and add to state
            // set dirty if redux already contains favorites - means i'll need to send to db on signout
            // ^^ or token expiration, need to check on that
            
            // Store user ID in redux state
            dispatch(setAuthUser(userId));
            
          } catch (error) {
            console.error("Error fetching user details: ", error);
          }
        } else {
          // If user is signed out, reset Redux state
          dispatch(setAuthUser(null));
        }
        navigate("/");
    };

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
                                setIsSignUp(false);
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