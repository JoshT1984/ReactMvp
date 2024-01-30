import "../../../css/gameover.css";
import { useState, useEffect } from "react";
import gameover from "../../../audio/gameover.mp3"
import Button from "../_ThirdLevel/Button.jsx";

function Gameover({ currentScreen, onSubmit }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(new Audio(gameover));
  useEffect(() => {
    return () => {
      sound.pause();
      sound.currentTime = 0;
    };
  }, [sound]);

  const playAudio = () => {
    if (currentScreen === "gameover") {
      sound.loop = true;
      sound.volume = 0.1;
      sound.play();
      setIsPlaying(true);
    } else {
      sound.pause();
    }
  };

  const handleBodyClick = () => {
    if (!isPlaying) {
      playAudio();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {};
  }, [isPlaying]);

  const switchMusic = (response) => {
    sound.setAttribute("src", gameover); //change the source
  };

  return (
    <>
      <div id="gameover_screen">
        <img
          src="../../images/backgrounds/Gameover_Screen.png"
          alt="gameover"
        />
      </div>
      <div className="btn-div">
        <Button onSubmit={onSubmit} musicChange={switchMusic} />
      </div>
      <div id="gameover">
        <img src="../../images/titles/gameover.png" alt="gameover" />
      </div>
    </>
  );
}
export default Gameover;
