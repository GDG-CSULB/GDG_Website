import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Meetings from "./pages/Meetings";
import About from "./pages/About";
import "./App.css";

function Navbar() {
  // All pages now use BrowserWindow component with tabs, so navbar is hidden
  return null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
