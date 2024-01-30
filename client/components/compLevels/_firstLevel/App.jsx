import { useState } from "react";
import Home from "../../phaser/Home.jsx";
import UI_Bar from "../_SecondLevel/UI_Bar.jsx";
import Title from "../_SecondLevel/Title.jsx";
import Gameover from "../_SecondLevel/Gameover.jsx";
import React from "react";
import "../../../css/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [currentScreen, setScreen] = useState("title");
  // const [currentScreen, setScreen] = useState("gameover");

  const handleScreen = (response) => {
    if (response === "start") {
      setScreen("main");
    }
  };
  return (
    <div>
      {currentScreen === "main" ? <UI_Bar /> : null}
      <BrowserRouter>
        <Routes>
          {currentScreen === "title" ? (
            // {currentScreen === "gameover" ? (
            <Route
              path="/"
              element={
                <Title
                  // <Gameover
                  onSubmit={handleScreen}
                  currentScreen={currentScreen}
                />
              }
            />
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

{
  /* <Route path="/" element={<Title />}/> */
}
