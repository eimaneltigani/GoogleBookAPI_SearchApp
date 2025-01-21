import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn as awsSignIn } from 'aws-amplify';
import { Container, Form, Button } from 'react-bootstrap';
import { setAuthUser } from '../redux/store/sessionSlice';
import './Login.css';


const Login = ({ onSignin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        console.log('error signing in');
        try {
            const user = await signIn(username, password);
            //callback function recieves AWS Cognito payload once user successfully authenticates
            onSignin();
            navigate("/");
        } catch (error) {
            console.log('error signing in', error)
        }
    }

    return (
        <Container id="main-container" className="d-grid h-100">
            <Form id="sign-in-form" className="text-center p-3 w-100">
                <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
                <Form.Group controlId="sign-in-email-address">
                    <Form.Control type="email" size="lg" placeholder="Email address" className="position-relative" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group className= "mb-3" controlId="sign-in-password">
                    <Form.Control type="password" size="lg" placeholder="Password" className="position-relative" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="d-grid">
                    <Button variant="primary" onClick={signIn}>Sign In</Button>
                </div>
            </Form>

        </Container>
        // <div className="login">
        //     <input
        //         type="text"
        //         id="username"
        //         label="username"
        //         value={username}
        //         onChange={e => setUsername(e.target.value)}
        //     />
        //     <input
        //         id="password"
        //         label="password"
        //         type="password"
        //         value={password}
        //         onChange={e => setPassword(e.target.value)}
        //     />
        //     <Button id="siginButton" color="primary" onClick={signIn}>
        //         Sign In
        //     </Button>
        // </div>
    )
}

export default Login;