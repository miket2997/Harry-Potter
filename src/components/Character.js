import React from "react";
import { Link } from "react-router-dom";

export default function Character(props){

    return (
        <Link style={ { textDecoration: "none" } } to={ `/characters/${props.id}`} className="character">
            <h2>{ props.name }</h2>
            <h3>{ props.house }</h3>
            <small>Click for more details</small>
            { props.image && <img src={ props.image } alt="No img available" />}
        </Link>
    )
}

