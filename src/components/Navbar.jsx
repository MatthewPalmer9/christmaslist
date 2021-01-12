import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar(props) {
    const {authUser} = props.state;
    let history = useHistory();

    const LogOut = () => {
        props.handleLogout()
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
                    <div>You are not logged in</div>
                </>
            )}
            </>
    )
}
