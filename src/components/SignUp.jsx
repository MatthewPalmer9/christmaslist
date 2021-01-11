import React, { Component } from 'react';
import { api } from '../services/api.js';
import '../styles/signup.css';


export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const user = { user: this.state }
        api.user.newUser(user)
        .then(resp => console.log(resp))
    }

    render() {
        return (
            <>
                <div className="signup">
                    <label htmlFor="username">Username: </label>
                    <input onChange={this.handleChange} name="username" type="text"/>

                    <label htmlFor="email">Email: </label>
                    <input onChange={this.handleChange} name="email" type="text"/>

                    <label htmlFor="password">Password: </label>
                    <input onChange={this.handleChange} name="password" type="text"/>

                    <button onClick={this.handleSubmit} type="submit">Sign Up</button>
                </div>
            </>
        )
    }
}
