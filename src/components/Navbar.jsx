import React from 'react';
import '../styles/navbar.css';

export default function Navbar(props) {
    const {authUser} = props.state;
    const {handleLogout} = props;
    return (
            <>
            {authUser.id ? (
                <>
                    <div className="nav-container">
                        <div className="brand">JollyList</div>
                        <div className="auth-box">
                            <div>{authUser.username}</div>
                            <button onClick={handleLogout} id="logout">Log Out</button>
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
