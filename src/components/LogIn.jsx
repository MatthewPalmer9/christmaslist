import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';
import "../styles/login.css";

export default function LogIn(props) {
    const { authUser } = props;
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirectToSignUp = () => {
        history.push("/signup");
    }

    const handleChange = e => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else if(e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = () => {
        const user = { user: {email: email, password: password} }

        api.auth.login(user)
        .then(data => {
            localStorage.setItem('token', data.jwt)
            localStorage.setItem('user', data.user.username)
            localStorage.setItem('userEmail', data.user.email)
            props.login(data)
        })
        setEmail("");
        setPassword("");
        const inputVal = document.querySelectorAll("input");
        inputVal.forEach((input) => input.value = "");
        history.push("/dashboard");
    }

        return (
            <>
                {authUser.id ? (
                    history.push("/dashboard")
                ) : (
                    <div className="login-container">
                        <div className="login-shadow-box">
                            <div className="login">
                                <label htmlFor="email">Email: </label>
                            
                                <input onChange={handleChange} name="email" type="text"/>

                                <label htmlFor="password">Password: </label>
                                <input onChange={handleChange} name="password" type="password"/>

                                <button onClick={handleSubmit} type="submit">Log In</button>
                            </div>
                            <p>Don't have an account? <span onClick={redirectToSignUp}>Sign up here!</span></p>
                        </div>
                    </div>
                )}
            </>
        )
}
