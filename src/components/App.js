import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Favorites from "./Favorites";

export default function App() {
  
  return (
    <div className="App"> 
      <Router basename='/'>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route name="Favorites" path="/Favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}
