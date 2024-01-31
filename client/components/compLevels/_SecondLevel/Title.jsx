import "../../../css/title.css";
import { useState, useEffect } from "react";
import title from "../../../audio/title.mp3";
import battle from "../../../audio/battle.mp3";
import Button from "../_ThirdLevel/Button.jsx";

function Title({ currentScreen, onSubmit}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(new Audio(title));

  const playAudio = () => {
    if (currentScreen === "title") {
      sound.loop = true;
      sound.volume = 0.1;
      sound.play();
      setIsPlaying(true);
    } else {
      sound.pause();
      sound.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const switchMusic = (response, attribute) => {
    sound.pause();
    sound.currentTime = 0;
    sound.setAttribute("src", battle); // Change the source
    sound.play();
    setIsPlaying(true);
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

  return (
    <>
      <div id="title_screen">
        <img
          src="../../images/backgrounds/Title_Screen.png"
          alt="title_screen"
        />
      </div>
      <div className="btn-div">
        <Button onSubmit={onSubmit} musicChange={switchMusic} />
      </div>
      <div id="title">
        <img src="../../images/titles/title.png" alt="title" />
      </div>
    </>
  );
}
export default Title;
