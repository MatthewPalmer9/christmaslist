import React, { Component } from 'react';
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

                    <button type="submit">Sign Up</button>
                </div>
            </>
        )
    }
}
