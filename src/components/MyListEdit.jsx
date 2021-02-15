import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';
import '../styles/edit.css';

export default function MyListEdit(props) {

    const { authUser } = props;
    const [userID, setUserID] = useState(0);
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const listID = props.match.url.split("/")[3];
    let history = useHistory();

    useEffect(() => {

        api.list.editUserListByUrl(listID)
        .then(resp => {
            if(!resp.err) {
                setUserID(+resp.listitem.user_id)
                setUrl(resp.listitem.url)
                setDescription(resp.listitem.description)
            } else {
                history.push("/dashboard");
            }
        })
    }, [history, listID])

    const renderCondition = () => {
        if(authUser.id === userID) {
            return <h3 className="editor-h3">Success</h3>
        } else {
            return <h3>Redirecting...</h3>
        }
    }

    const handleChange = e => {
        if(e.target.name === "description") {
            setDescription(e.target.value)
        } else if(e.target.name === "url") {
            setUrl(e.target.value)
        }
    }

    const handleSubmit = () => {
        api.list.editListItem({list: {id: listID, description: description, url: url}})
        .then(resp => console.log(resp))
        history.push("/mylist")
    }

    return (
        <>
            {renderCondition()}
            <div className="editor-container">
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} name="description" value={description} />
                <label htmlFor="description">URL</label>
                <input onChange={handleChange} name="url" value={url} />

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}
