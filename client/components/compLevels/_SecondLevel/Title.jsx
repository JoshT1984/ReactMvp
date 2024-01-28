import "../../../css/title.css";
import Button from "../_ThirdLevel/Button.jsx";

function Title() {
  let isPlaying = false;
  let sound = document.createElement("audio");
  playMusic();

  function playMusic() {
    if (isPlaying === false) {
      playAudio();
    }
    isPlaying = true;
  }

  function playAudio() {
    sound.loop = true;
    sound.volume = 0.1;
    sound.src = "../../../audio/test.mp3";
    sound.play();
  }
  return (
    <>
      <div id="title">
        <img
          src="../../images/backgrounds/Title_Screen.png"
          alt="title_screen"
        />
      </div>
      <div className="btn-div">
        <Button />
      </div>
    </>
  );
}
export default Title;
