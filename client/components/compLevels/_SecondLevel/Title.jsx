import "../../../css/title.css";
import { useState, useEffect } from "react";
import Button from "../_ThirdLevel/Button.jsx";

function Title({ currentScreen, onSubmit }) {
 
  return (
    <>
      <div id="title_screen">
        <img
          src="../../images/backgrounds/Title_Screen.png"
          alt="title_screen"
        />
      </div>
      <div className="btn-div">
        <Button onSubmit={onSubmit}  />
      
      </div>
      <div id="title">
        <img src="../../images/titles/title.png" alt="title" />
      </div>
    </>
  );
}
export default Title;
