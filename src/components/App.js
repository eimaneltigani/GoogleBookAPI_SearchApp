import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "../styles.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Saved from "./Saved";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route name="Home" exact path="/" element={<Home />} />
            <Route name="Favorites" exact path="/Favorites" element={<Saved />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
