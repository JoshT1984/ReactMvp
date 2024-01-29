import React from "react";
import Phaser from "phaser";
import GameComponent from "./GameComponent.jsx";
import "./phaser.css";

class Game extends Phaser.Scene {
  preload() {
    this.load.image(
      "background",
      "../../images/backgrounds/main_background.png"
    );
    this.load.spritesheet(
      "player",
      "../../images/spritesheets/player_spritesheet.png",
      { frameWidth: 50, frameHeight: 50 }
    );

    this.load.spritesheet("acid", "../../images/spritesheets/acid_ooze.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.speed = 3;
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);

    this.acid = this.physics.add.sprite(400, 50, "acid");

    this.anims.create({
      key: "idle_ooze",
      frames: [
        { key: "acid", frame: 0 },
        { key: "acid", frame: 1 },
        { key: "acid", frame: 2 },
        { key: "acid", frame: 3 },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.acid.play("idle_ooze");
    this.acid.setScale(2.8);

    this.player = this.physics.add.sprite(400, 550, "player");

    this.anims.create({
      key: "idle",
      frames: [
        { key: "player", frame: 0 },
        { key: "player", frame: 1 },
        { key: "player", frame: 2 },
        { key: "player", frame: 3 },
        { key: "player", frame: 4 },
        { key: "player", frame: 5 },
        { key: "player", frame: 6 },
        { key: "player", frame: 7 },
        { key: "player", frame: 8 },
        { key: "player", frame: 9 },
        { key: "player", frame: 10 },
        { key: "player", frame: 11 },
        { key: "player", frame: 12 },
        { key: "player", frame: 13 },
        { key: "player", frame: 14 },
        { key: "player", frame: 15 },
        { key: "player", frame: 16 },
        { key: "player", frame: 17 },
        { key: "player", frame: 18 },
        { key: "player", frame: 19 },
        { key: "player", frame: 20 },
        { key: "player", frame: 21 },
        { key: "player", frame: 22 },
        { key: "player", frame: 23 },
        { key: "player", frame: 24 },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.player.play("idle");
    this.player.setScale(2.8);
    this.physics.world.setBounds(12, 5, 785, 550);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    if (this.cursors.left.isDown || this.keys.left.isDown) {
      this.player.x -= this.speed;
    }
    if (this.cursors.right.isDown || this.keys.right.isDown) {
      this.player.x += this.speed;
    }
    if (this.cursors.down.isDown || this.keys.down.isDown) {
      this.player.y += this.speed;
    }
    if (this.cursors.up.isDown || this.keys.up.isDown) {
      this.player.y -= this.speed;
    }
  }
}

const Home = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 800,
    height: 600,
    scene: Game,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: true,
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
