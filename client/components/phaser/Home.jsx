import React from "react";
import { useEffect } from "react";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import GameScene from "./GameScene.jsx";

const Home = ({ currentScreen, onClick, onLivesChange }) => {

  return (
    <div className="phaserBoard">
      <GameComponent config={GameComponent.config} onLivesChange = {onLivesChange}/>
    </div>
  );
};

export default Home;
