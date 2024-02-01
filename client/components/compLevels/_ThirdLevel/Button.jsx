import { useState } from "react";
import "../../../css/button.css";

function Button({ onSubmit, musicChange }) {
  const startGame = () => {
    onSubmit("start");
  };

  const scores = () => {
    onSubmit("scoreWindow");
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
