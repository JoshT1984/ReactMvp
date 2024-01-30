import "../../../css/score.css";
import React from "react";

const Score = ({ score, updateScore }) => {
  const updateScoreLocal = (newScore) => {
    updateScore(newScore);
  };
  return <div id="score">Score : {score}</div>;
};

export default Score;
