import React from 'react';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/LogIn.jsx';

export default function Landing(props) {

    const { signupForm, onLogin } = props;

    return (
        <>
            { signupForm ?
                <SignUp onSignin={onLogin} /> :
                <Login onLogin={onLogin} />
            }
        </>
    )
}
