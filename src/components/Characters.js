import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import Character from "./Character";


export default function Characters() {

  const [characters, setCharacters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [charactersPerPage] = useState(12);
  
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/characters")
      .then((res) => {
        setCharacters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const totalCharacters = characters.length;
    const totalPages = Math.ceil(totalCharacters / charactersPerPage);
    const paginationRange = 3; // Number of page numbers to show before and after the active page

    let startPage, endPage;
    if (totalPages <= paginationRange) {
      // Display all page numbers if total pages are less than or equal to paginationRange
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end page based on current page and paginationRange
      if (currentPage <= paginationRange) {
        startPage = 1;
        endPage = paginationRange * 2 + 1;
      } else if (currentPage + paginationRange >= totalPages) {
        startPage = totalPages - (paginationRange * 2 + 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - paginationRange;
        endPage = currentPage + paginationRange;
      }
    }

    // Generate the visible page numbers
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    setVisiblePages(pages);
  }, [characters, charactersPerPage, currentPage]);

  // Get current characters based on pagination
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="characters--container">
      <h1>Characters in Harry Potter Series</h1>
      <div className="characters">
          { currentCharacters.map(character => <Character key={ character.id } { ...character } />)}
      </div>
      <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {visiblePages[0] > 1 && <Pagination.Ellipsis />}
          {visiblePages.map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
            ))}
            {visiblePages[visiblePages.length - 1] < Math.ceil(characters.length / charactersPerPage) && (
              <Pagination.Ellipsis />
            )}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(characters.length / charactersPerPage)}
            />
            <Pagination.Last
              onClick={() => handlePageChange(Math.ceil(characters.length / charactersPerPage))}
            />
      </Pagination>
    </div>
  );
}
