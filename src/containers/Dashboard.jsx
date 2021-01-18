import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Dashboard(props) {
    const { authUser } = props;
    let history = useHistory();

    return (
        <>
            {authUser.id ? (
                <>
                    <div className="dashboard-welcome">Hello from Dashboard</div>
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
