import { useState } from "react";
import Home from "../../phaser/Home.jsx";
import UI_Bar from "../_SecondLevel/UI_Bar.jsx";
import Title from "../_SecondLevel/Title.jsx";
import Gameover from "../_SecondLevel/Gameover.jsx";
import React from "react";
import "../../../css/app.css";

import { useAudio } from "./AudioContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [currentScreen, setScreen] = useState("title");
  const [startGameover, setGameover] = useState(false);
  const { playAudio, stopAllAudio } = useAudio();

  // const [currentScreen, setScreen] = useState("gameover");
  const handleScreen = (response) => {
    if (response === "start") {
      setScreen("main");
    } else {
      setScreen("gameover");
    }
  };

  const handleLivesChange = () => {
    setScreen("gameover");
    setGameover(true);
  };

  return (
    <div>
      {/* {(currentScreen === "main" || currentScreen === "gameover") && <UI_Bar />} */}
      {(currentScreen === "main" && !startGameover) ||
      (currentScreen === "gameover" && startGameover) ? (
        <UI_Bar />
      ) : null}

      <BrowserRouter>
        <Routes>
          {startGameover === false ? (
            currentScreen === "title" ? (
              <Route
                path="/"
                element={
                  <Title
                    onSubmit={handleScreen}
                    currentScreen={currentScreen}
                  />
                }
              />
            ) : (
              <Route
                path="/"
                element={
                  <Home
                    currentScreen={currentScreen}
                    onLivesChange={handleLivesChange}
                  />
                }
              />
            )
          ) : (
            <Route
              path="/"
              element={<Gameover currentScreen={currentScreen} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
