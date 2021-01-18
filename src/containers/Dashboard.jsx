import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard(props) {
    const { authUser } = props;
    let history = useHistory();

    const redirectToUserList = () => {
        history.push("/mylist");
    }

    const redirectToFriendsChristmasLists = () => {
        history.push("/myfriendslists");
    }

    const redirectToFriendsList = () => {
        history.push("/myfriends");
    }

    return (
        <>
            {authUser.id ? (
                <>
                    <div className="dashboard-container">
                        <div className="options-container">

                            <h1>{authUser.username}'s Dashboard</h1>

                            <div id="options">
                                <div onClick={redirectToUserList} className="christmas-list">
                                    <i class="fas fa-scroll"></i>
                                    <p>My List</p>
                                </div>

                                <div onClick={redirectToFriendsChristmasLists} className="friends-list">
                                    <i class="fas fa-gifts"></i>
                                    <p>Friend's Lists</p>
                                </div>

                                <div onClick={redirectToFriendsList} className="friends">
                                    <i class="fas fa-user-friends"></i>
                                    <p>Friends</p>
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
