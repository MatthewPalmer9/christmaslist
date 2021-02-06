import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function TestPage(props) {

    const [user, setUser] = useState("");
    const [list, setList] = useState([])

    useEffect(() => {
        const username = props.match.url.split("/")[2]
        api.list.getUserListByUrl({user: username})
        .then(resp => {
            setUser(resp.user.username)
            setList(resp.listitems)
        })
    }, [props.match.url])

    const handleLink = index => {
        const checker = list[index].url.includes("https");
        if(checker) {
            return <a href={list[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else if(!checker && list[index].url !== ""){
            return <a href={`https://` + list[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else {
            return <span>N/A</span>
        }
    }


    return (
        <div>
            <h1>{user}'s JollyList</h1>
            {list.length === 0 ? (
                        <>
                            <h1>{user} has nothing in their list.</h1>
                        </>
                    ) : (
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <th>Order Online</th>
                                    </tr>
                                </tbody>
                                    {list.map((item, index) => {
                                        return (
                                            <tbody key={item.id}>
                                                <tr>
                                                    <td>{list[index].description}</td>
                                                    <td>
                                                        {handleLink(index)}           
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </table>
                        )
                    }
        </div>
    )
}
