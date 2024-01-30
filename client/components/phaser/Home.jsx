import React from "react";
import phaserConfig from "./phaserConfig.js";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import GameScene from "./GameScene.jsx";


const Home = () => {
  return (
    <div className="phaserBoard">
      <GameComponent config={phaserConfig} />
    </div>
  );
};

export default Home;
