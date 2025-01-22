import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/store/sessionSlice';
import { getCurrentUser, signUp, SignUpInput, signIn, SignInInput } from 'aws-amplify/auth';

import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [signUpForm, switchForm] = useState(true);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        console.log('user clicked sign up');
        navigate("/");
    }

    const handleSignIn = async () => {
        console.log('user clicked sign in');
        navigate("/");
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
        <>
            {errors && <div className="Error"> {errors} </div>}
            <div className="mainBlock">
            <form onSubmitCapture={(e) => e.preventDefault()}>
                <input 
                    type="email"
                    className="regField"
                    placeholder="Enter email:"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    className="regField"
                    placeholder="Enter password:"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {signUpForm ? 
                    <>
                        <input 
                            type="password"
                            className="regField"
                            placeholder="Enter confirm password:"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <input 
                            type="submit" 
                            className="submitBtn" 
                            value="SIGN UP" 
                            onClick={handleSignUp} 
                        />
                        <span className="underLine">
                            Have an account? 
                            <button 
                                className="linkBtn" 
                                onClick={() => switchForm(false)}
                            >
                                Sign in here
                            </button>
                        </span>
                    </> :
                    <>
                        <input 
                            type="submit" 
                            className="submitBtn" 
                            onClick={handleSignIn} 
                            value="SIGN IN" 
                        />
                        <span className="underLine">
                            Not Registered?  
                            <button 
                                className="linkBtn" 
                                onClick={() => switchForm(true)}
                            >
                                Create an account
                            </button>
                        </span>    
                    </> 
                }
            </form>
            </div>
        </>
    )
}

export default Login;