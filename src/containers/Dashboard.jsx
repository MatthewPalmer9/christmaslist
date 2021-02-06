import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard(props) {
    const { authUser } = props;
    let history = useHistory();

    const redirectToEditList = () => {
        history.push("/mylist");
    }

    const redirectToLiveListLink = () => {
        history.push(`/lists/${authUser.username}`);
    }

    return (
        <>
            {authUser.id ? (
                <>
                    <div className="dashboard-container">
                        <div className="options-container">

                            <h1>{authUser.username}'s Dashboard</h1>

                            <div id="options">
                                <div className="christmas-list">
                                    <i className="fas fa-scroll"></i>
                                    <p>My List</p>
                                    <div className="list-options">
                                        <button onClick={redirectToEditList}>Edit</button>
                                        <button onClick={redirectToLiveListLink}>View List</button>
                                    </div>
                                </div>

                                <div className="friends-list">
                                    <i className="fas fa-gifts"></i>
                                    <p>Friend's Lists</p>
                                    <span>(Coming Soon!)</span>
                                </div>

                                <div className="friends">
                                    <i className="fas fa-user-friends"></i>
                                    <p>Friends</p>
                                    <span>(Coming Soon!)</span>
                                </div>
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
