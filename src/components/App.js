import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "../styles.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Favorites from "./Favorites";

export default function App() {
  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route name="Favorites" exact path="/Favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
