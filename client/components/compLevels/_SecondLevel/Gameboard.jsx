import "../../../css/gameboard.css";

function Gameboard() {
  const doSomething = () => {
    console.log("FUCK YOU");
  };

  return (
    <div onClick={doSomething} className="gameboard">
      Hello
    </div>
  );
}

export default Gameboard;
