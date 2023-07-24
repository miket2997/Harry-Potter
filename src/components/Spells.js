import React, { useEffect, useState } from "react";
import axios from "axios";
import Spell from "./Spell";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

export default function Spells() {

  const navigate = useNavigate();
  const [spells, setSpells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const spellsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/spells")
      .then((res) => {
        setSpells(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Calculate the index range of spells to display for the current page
  const indexOfLastSpell = currentPage * spellsPerPage;
  const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
  const currentSpells = spells.slice(indexOfFirstSpell, indexOfLastSpell);

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="spells--container">
      <div className="spells--header">
        <h1>List of Spells</h1>
        <p>Below is a list of spells known to be used in the Harry Potter series.</p>
      </div>
      <div className="spells--list">
        {currentSpells.map((spell) => (
          <Spell key={spell.id} {...spell} />
        ))}
      </div>
      <Pagination>
        {Array.from(
          Array(Math.ceil(spells.length / spellsPerPage)).keys()
        ).map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={currentPage === pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <div className="navigate">
        <button onClick={ () => navigate(-1) }>Go back</button>
        <button onClick={ () => navigate("/") }>Go to Home page</button>
        <button onClick={ () => navigate("/quiz") }>Take a Quiz</button>
      </div>
    </div>
  );
}
