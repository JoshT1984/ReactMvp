import React from "react";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import GameScene from "./GameScene.jsx";

const Home = () => {
  return (
    <div className="phaserBoard">
      <GameComponent config={GameComponent.config} />
    </div>
  );
};

export default Home;
