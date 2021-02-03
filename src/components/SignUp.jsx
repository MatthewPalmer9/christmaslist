import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';
import '../styles/signup.css';


export default function SignUp(props) {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = e => {
        if(e.target.name === "username") {
            setUsername(e.target.value);
        } else if(e.target.name === "email") {
            setEmail(e.target.value);
        } else if(e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = {username: username, email: email, password: password}
        const user = { user: data }
        api.user.newUser(user)
        .then(resp => console.log(resp))
    }

    const redirectToSignIn = () => {
        history.push("/login");
    }

        return (
            <>
            <div className="signup-container">
                <div className="signup-shadow-box">
                    <div className="signup">
                        <label htmlFor="username">Username: </label>
                        <input onChange={handleChange} name="username" type="text"/>

                        <label htmlFor="email">Email: </label>
                        <input onChange={handleChange} name="email" type="text"/>

                        <label htmlFor="password">Password: </label>
                        <input onChange={handleChange} name="password" type="text"/>

                        <button onClick={handleSubmit} type="submit">Sign Up</button>
                    </div>
                    <p>Already have an account? <span onClick={redirectToSignIn}>Sign in here!</span></p>
                </div>
            </div>
            </>
        )
}
