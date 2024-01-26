import React from "react";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import "./phaser.css";

class Game extends Phaser.Scene {
  preload() {
    this.load.image("background", "../../images/backgrounds/Lvl_One_BG.png");
  }

  create() {
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);
    // const particles = this.add.particles(0, 0, "red", {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: "ADD",
    // });
    // const logo = this.physics.add.image(400, 100, "logo");
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);
    // particles.startFollow(logo);
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
