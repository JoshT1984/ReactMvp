import { useState } from "react";
import "../../../css/button.css";

function Button({ onSubmit, musicChange }) {
  const startGame = () => {
    onSubmit("start");
    // musicChange(true);
  };

  const scores = () => {
    console.log("scores");
  };

  return (
    <>
      <div onClick={startGame} className="button">
        Start Game
      </div>
      ;
      <div onClick={scores} className="button">
        Scores
      </div>
      ;
    </>
  );
}

export default Button;
