import React, { Component } from 'react';
import "../styles/login.css";

export default class LogIn extends Component {

    constructor() {
        super()
        this.state = {
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
            <div className="login">
                <label htmlFor="email">Email: </label>
                <input onChange={this.handleChange} name="email" type="text"/>

                <label htmlFor="password">Password: </label>
                <input onChange={this.handleChange} name="password" type="text"/>

                <button type="submit">Log In</button>
            </div>
        )
    }
}
