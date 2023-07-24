import React from "react";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Spells from "./components/Spells";
import Quiz from "./components/Quiz";
import CharacterDetails from "./components/CharacterDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/characters" element={ <Characters /> } />
        <Route path="/characters/:characterId" element={ <CharacterDetails /> } />
        <Route path="/spells" element={ <Spells /> } />
        <Route path="/quiz" element={ <Quiz /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
