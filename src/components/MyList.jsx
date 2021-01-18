import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function MyList(props) {
    const { authUser } = props;
    let history = useHistory();

    useEffect(() => {
        console.log("Component mounted");
    });

    return (
        <>
            {authUser.id ? (
                <>
                    <div>Hello {authUser.username}</div>
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
