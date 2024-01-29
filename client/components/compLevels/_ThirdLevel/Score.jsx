import "../../../css/score.css";
import { useState } from "react";

function Score() {
  const [currentScore, setScore] = useState(3);

  return <div id="score">Score : {currentScore}</div>;
}

export default Score;
