import React from "react";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import "./phaser.css";

class Game extends Phaser.Scene {
  preload() {
    this.load.image("background", "../../images/backgrounds/main_background.png");
  }

  create() {
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);
  }
}

const Home = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1000,
    height: 800,
    scene: Game,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  return (
    <div className="phaserBoard">
      <GameComponent config={config} />
    </div>
  );
};

export default Home;
