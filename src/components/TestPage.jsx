import React from 'react';

export default function TestPage(props) {
    return (
        <div>
            Hello from Test
            {console.log(props.match)}
        </div>
    )
}
