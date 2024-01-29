import "../../../css/lives.css";
import { useState } from "react";

function Lives() {
  const [currentLives, setLives] = useState(3);

  return <div id="lives">Lives: {currentLives}</div>;
}

export default Lives;
