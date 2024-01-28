import "../../../css/button.css";

function Button() {
  const doSomething = () => {
    console.log("FUCK YOU");
  };

  return (
    <>
  <div onClick={doSomething} className="button">Start Game</div>;
  <div onClick={doSomething} className="button">Scores</div>;
  </>
  )
  
}

export default Button;
