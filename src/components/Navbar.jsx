import React, { PureComponent } from 'react';
import '../styles/navbar.css';

export default class Navbar extends PureComponent {

    render() {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');
        if(token) {
            return (
                <>
                    <div className="nav-container">
                        <div className="brand">JollyList</div>
                        <div className="auth-box">
                            <div>{userName}</div>
                            <button id="logout">Log Out</button>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <>
                    <div className="nav-container">
                        <div className="brand">JollyList</div>
                        <div className="auth-box">Hello, NotLoggedIn!</div>
                    </div>
                </>
            )
        }
    }
}
