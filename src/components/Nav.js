import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){

    return (
        <nav className="nav">
            <Link className="nav--link" to="/">Home</Link>
            <Link className="nav--link" to="/characters">Characters</Link>
            <Link className="nav--link" to="/spells">Spells</Link>
            <Link className="nav--link" to="/quiz">Quiz</Link>
        </nav>
    )
}