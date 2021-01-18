import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard(props) {
    const { authUser } = props;
    let history = useHistory();

    return (
        <>
            {authUser.id ? (
                <>
                    <div className="dashboard-container">
                        <div className="options-container">
                            <h1>{authUser.username}'s Dashboard</h1>
                            <div id="options">
                                <div className="christmas-list"></div>
                                <div className="friends-family-list"></div>
                                <div className="friends"></div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
