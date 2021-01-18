import React, { Component } from 'react';
import { api } from '../services/api.js';
import "../styles/login.css";

export default class LogIn extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    redirect = () => {
        this.props.login()
        this.props.history.push('/dashboard');
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        const user = { user: this.state }

        api.auth.login(user)
        .then(data => {
            localStorage.setItem('token', data.jwt)
            localStorage.setItem('user', data.user.username)
            localStorage.setItem('userEmail', data.user.email)
            this.props.login(data)
        })
        this.setState({
            email: "",
            password: ""
        });
        const inputVal = document.querySelectorAll("input");
        inputVal.forEach((input) => input.value = "");
        this.props.history.push("/dashboard");
    }


    render() {
        return (
            <div className="login">
                <label htmlFor="email">Email: </label>
            
                <input onChange={this.handleChange} name="email" type="text"/>

                <label htmlFor="password">Password: </label>
                <input onChange={this.handleChange} name="password" type="password"/>

                <button onClick={this.handleSubmit} type="submit">Log In</button>
            </div>
        )
    }
}
