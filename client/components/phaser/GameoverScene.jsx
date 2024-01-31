import React, { useState } from "react";
import Phaser, { Time } from "phaser";
import preloadAssets from "./preloadAssets.js";

class GameoverScene extends Phaser.Scene {
  constructor() {}
  preload() {
    preloadAssets(this);
  }

  create() {
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);

    // this.cursors = this.input.keyboard.createCursorKeys();
    // this.keys = this.input.keyboard.addKeys({
    //   up: Phaser.Input.Keyboard.KeyCodes.W,
    //   down: Phaser.Input.Keyboard.KeyCodes.S,
    //   left: Phaser.Input.Keyboard.KeyCodes.A,
    //   right: Phaser.Input.Keyboard.KeyCodes.D,
    // });

    // this.input.on("pointerdown", () => {
    //   if (this.canShoot) {
    //     this.shootFireball();
    //     this.canShoot = false;
    //     this.time.delayedCall(1000, () => {
    //       this.canShoot = true;
    //     });
    //   }
    // });
  }
  update() {}
}
export default GameoverScene;
