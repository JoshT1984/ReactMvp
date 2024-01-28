import { useState } from "react";
import Home from "../../phaser/Home.jsx";
import UI_Bar from "../_SecondLevel/UI_Bar.jsx";
import Title from "../_SecondLevel/Title.jsx";
import React from "react";
import "../../../css/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [currentScreen, setScreen] = useState(true);

  let title = true;

  const switchScreenMode = () => {
    title = !title;
    setScreen(title);
  };
  return (
    <div onClick={switchScreenMode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title />} />
          {/* {currentScreen ? (
            <Route path="/" element={<Title />} />
          ) : (
            <Route path="/" element={<Home />} />
          )} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

{
  /* <Route path="/" element={<Title />}/> */
}
