import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){

    return (
        <footer className="footer">
            <Link className="footer--link" to="/">Home</Link> 
            <Link className="footer--link" to="/characters">Characters</Link>
            <Link className="footer--link" to="/spells">Spells</Link>
            <Link className="footer--link" to="/quiz">Quiz</Link>
        </footer>
    )
}