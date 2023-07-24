import React from "react";

export default function Spell(props){
    return (
        <div className="spell">
            <h2>{ props.name }</h2>
            <p>{ props.description }</p>
        </div>
    )
}

