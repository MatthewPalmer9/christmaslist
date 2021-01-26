import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar(props) {
    const {authUser} = props.state;
    let history = useHistory();

    const Home = () => {
        history.push("/");
    }

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
                        <div onClick={Home} className="brand"><a href="/">JollyList</a></div>
                        <div className="auth-box">
                            <div><a href={`/dashboard`}>{authUser.username}</a></div>
                            <button onClick={LogOut} id="logout">Log Out</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="nav-container">
                        <div onClick={Home} className="brand"><a href="/">JollyList</a></div>
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
