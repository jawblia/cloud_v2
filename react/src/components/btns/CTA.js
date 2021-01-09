import React from 'react';

export default function CTA (props) {
        return(
            <button className={`btn CTA ${props.color} ${props.kind}`} type={props.type} onClick={props.handleClick}>
                <h4>{props.name}</h4>
            </button>
        )
}
