import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function CharacterDetails(){

    const { characterId } = useParams();

    const [character, setCharacter] = useState({});

    const [wand, setWand] = useState({});

    const [alternateNames, setAlternateNames] = useState([]);

    useEffect(() => {
        axios.get(`https://hp-api.onrender.com/api/character/${characterId}`)
        .then(res => {
            setCharacter(res.data[0])
            setAlternateNames(res.data[0].alternate_names)
            setWand(res.data[0].wand)
        })
        .catch(err => console.log(err))
    }, [characterId])

    console.log(character)
    return (
        <div className="character-details">
        { character.image && <img src={character.image} alt="img not available" /> }
        <h1>Character Details</h1>
        <div className="character-info">
            <table>
                <tbody>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>{character.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Wizard?</strong></td>
                        <td>{ character.wizard ? "Yes" : "No" }</td>
                    </tr>
                    <tr>
                        <td><strong>Gender</strong></td>
                        <td>{ character.gender }</td>
                    </tr>
                    { character.hairColour && (
                        <tr>
                            <td><strong>Hair Color</strong></td>
                            <td>{ character.hairColour }</td>
                        </tr>
                    )}
                    { character.eyeColour && (
                        <tr>
                            <td><strong>Eye Color</strong></td>
                            <td>{ character.eyeColour }</td>
                        </tr>
                    ) }
                    { character.dateOfBirth && (
                        <tr>
                            <td><strong>Birthday</strong></td>
                            <td>{ character.dateOfBirth }</td>
                        </tr>
                    ) }
                    <tr>
                        <td><strong>Hogwarts Staff or Student</strong></td>
                        <td>
                            {character.hogwartsStaff
                                ? "Staff"
                                : character.hogwartsStudent
                                ? "Student"
                                : "Unknown"
                            }
                        </td>
                    </tr>
                    {alternateNames.length > 0 && (
                        <tr>
                            <td><strong>Nick Names:</strong></td>
                            <td>
                                <ul className="alternate-names">
                                    {alternateNames.map((name) => (
                                        <li key={name}>{name}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ) }
                    <tr>
                        <td><strong>Dead or Alive:</strong></td>
                        <td>{character.alive ? "Alive" : "Dead"}</td>
                    </tr>
                    { character.actor && (
                        <tr>
                            <td>
                                <strong>{character.gender === "male" ? "Actor:" : "Actress:"}</strong>
                            </td>
                            <td>{character.actor}</td>
                        </tr>
                    ) }
                    { character.ancestry && (
                        <tr>
                            <td><strong>Ancestry:</strong></td>
                            <td>{character.ancestry}</td>
                        </tr>
                    )}
                    { character.house && (
                        <tr>
                            <td><strong>House:</strong></td>
                            <td>{character.house}</td>
                        </tr>
                    ) }
                    { wand.core && (
                        <tr>
                            <td><strong>Wand:</strong></td>
                            <td>
                                <ul className="wand-info">
                                    <li>
                                        <strong>Core:</strong> {wand.core}
                                    </li>
                                    <li>
                                        <strong>Length:</strong> {wand.length} inches
                                    </li>
                                    <li>
                                        <strong>Wood:</strong> {wand.wood}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    ) }
                    { character.patronus && (
                        <tr>
                            <td><strong>Patronus</strong></td>
                            <td>{ character.patronus }</td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    </div>
    
    )
}

