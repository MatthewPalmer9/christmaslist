import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar(props) {
    const {authUser} = props.state;
    let history = useHistory();

    const LogIn = () => {
        history.push("/login");
    }

    const SignUp = () => {
        history.push("/signup");
    }

    const LogOut = () => {
        props.handleLogout();
        history.push("/");
    }

    return (
            <>
            {authUser.id ? (
                <>
                    <div className="nav-container">
                        <div className="brand">JollyList</div>
                        <div className="auth-box">
                            <div>{authUser.username}</div>
                            <button onClick={LogOut} id="logout">Log Out</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="nav-container">
                        <div className="brand">JollyList</div>
                        <div className="auth-box">
                            <button onClick={LogIn} id="login">Log In</button>
                            <button onClick={SignUp} id="signup">Sign Up</button>
                        </div>
                    </div>
                </>
            )}
            </>
    )
}
