import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../phaser/Home.jsx";
import UI_Bar from "../_SecondLevel/UI_Bar.jsx";
import Title from "../_SecondLevel/Title.jsx";
import ScoreWindow from "../_SecondLevel/ScoreWindow.jsx";
import Gameover from "../_SecondLevel/Gameover.jsx";
import "../../../css/app.css";

import { useAudio } from "./AudioContext";

const App = () => {
  const [currentScreen, setScreen] = useState("title");
  const [startGameover, setGameover] = useState(false);
  const { playAudio, stopAllAudio } = useAudio();

  useEffect(() => {
    // Stop any currently playing audio before starting a new one
    stopAllAudio();

    // Play audio based on the current screen
    let audioPath = "";

    switch (currentScreen) {
      case "title":
        audioPath = "../../../../audio/title.mp3";
        setTimeout(() => playAudio(audioPath), 100); // Add a delay of 100 milliseconds
        break;
      case "main":
        audioPath = "../../../../audio/battle.mp3";
        setTimeout(() => playAudio(audioPath), 100);
        break;
      case "gameover":
        audioPath = "../../../../audio/gameover.mp3";
        setTimeout(() => playAudio(audioPath), 100);
        break;
      default:
        stopAllAudio();
    }
  }, [currentScreen]);

  const handleScreen = (response) => {
    if (response === "start") {
      setScreen("main");
    }
    if (response === "scoreWindow") {
      console.log("HELLO");
      setScreen("scoreWindow");
    }
  };

  const handleLivesChange = () => {
    setScreen("gameover");
    setGameover(true);
  };

  return (
    <div>
      {((currentScreen === "main" && !startGameover) ||
        (currentScreen === "gameover" && startGameover)) && <UI_Bar />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currentScreen === "title" ? (
                <Title onSubmit={handleScreen} currentScreen={currentScreen} />
              ) : currentScreen === "main" ? (
                <Home currentScreen={currentScreen} onLivesChange={handleLivesChange} />
              ) : currentScreen === "scoreWindow" ? (
                <ScoreWindow currentScreen={currentScreen} />
              ) : (
                <Gameover currentScreen={currentScreen} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;