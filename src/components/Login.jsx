import React from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


function Login({ signOut, user}) {
    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign Out</button>
        </>
    )
}

export default withAuthenticator(Login);