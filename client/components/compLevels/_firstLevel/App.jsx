import Home from "../../phaser/Home.jsx";
import Gameboard from "../_SecondLevel/Gameboard.jsx";
import React from "react";
import "../../../css/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Gameboard />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/gameboard" element={<Gameboard />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
