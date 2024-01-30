import Phaser from "phaser";
import GameScene from "./GameScene.jsx";
import "./phaser.css";

const phaserConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: 800,
  height: 600,
  scene: GameScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

export default phaserConfig;
