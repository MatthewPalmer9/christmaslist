import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';

export default function MyListEdit(props) {

    const { authUser } = props;
    const [userID, setUserID] = useState(0);
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    let history = useHistory();

    useEffect(() => {
        let listID = props.match.url.split("/")[3];

        api.list.editUserListByUrl(listID)
        .then(resp => {
            setUserID(+resp.listitem.user_id)
            setUrl(resp.listitem.url)
            setDescription(resp.listitem.description)
        })
    }, [props.match.url])

    return (
        <>
            {authUser.id === userID ? (
                <>
                    <h3>Success</h3>
                </>
            ) : (
                <>
                    <h3>You are not authorized to edit this list item.</h3>
                </>
            )}
        </>
    )
}
