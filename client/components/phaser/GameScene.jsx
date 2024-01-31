import React, { useState } from "react";
import Phaser, { Time } from "phaser";
import playerMovement from "./playerMovement.js";
import preloadAssets from "./preloadAssets.js";
import animations from "./animations.js";
import Enemy from "./Enemy.jsx";
import Fireball from "./Fireball.jsx";

import Currency from "./Currency.jsx";

class GameScene extends Phaser.Scene {
  constructor(updateScore, updateCurrency, updateLives) {
    super("GameScene");
    this.isSpawn = true;
    this.score = 0;
    this.updateScore = updateScore;
    this.totalCurrency = 0;
    this.updateCurrency = updateCurrency;
    this.lives = 3;
    this.updateLives = updateLives;
    this.collectCurrency = this.collectCurrency.bind(this);
    this.canShoot = true;
    this.canLoseLife = true;
  }
  preload() {
    preloadAssets(this);
  }

  create() {
    //----------------------------------ADD SFX----------------------------
    this.gemPickup = this.sound.add("gemCollect");
    this.enemyExplosion = this.sound.add("enemyExplosion");
    this.shootfire = this.sound.add("shootfire");
    this.hit = this.sound.add("hit");
    this.speed = 3;
    //--------------------CREATE BACKGROUNDS--------------------------------
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);

    //----------------------------------------------------CREATE GAMECURRENCY WITH SPAWNER---------------------------------------
    this.currency = this.physics.add.group({
      classType: Currency,
      runChildUpdate: true,
    });

    this.currency.children.iterate((gems) => {
      gems.setScale(1.5);
    });

    this.time.addEvent({
      delay: 8000,
      callback: this.spawnCurrency,
      callbackScope: this,
      loop: this.isSpawn,
    });

    //--------------------------------------------------Create FIREBALL GROUP WITH Children
    this.fireball = this.physics.add.group({
      classType: Fireball,
      runChildUpdate: true,
    });
    this.fireball.children.iterate((flames) => {
      flames.setScale(1.5);
    });

    //-------------------------------------------------------ENEMIES-------------------------------

    this.acidEnemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
    });
    this.acidEnemies.children.iterate((enemy) => {
      enemy.play("idle_ooze");
      enemy.setScale(2);
    });

    //-----------------------------------------------------------PLAYER/CuRRENCY COLLIDER-------------------------------
    this.player = this.physics.add.sprite(400, 550, "player");
    this.physics.add.collider(
      this.player,
      this.currency,
      this.destroyCurrency,
      null,
      this
    );
    //-----------------------------------------------------------PLAYER/ENEMY COLLIDER-------------------------------
    this.physics.add.collider(
      this.player,
      this.acidEnemies,
      this.loseLive,
      null,
      this
    );

    this.player.body.setSize(10, 20);
    // this.player.setoffset(45, 0);
    animations(this.player, "idle");
    this.player.setScale(2.8);
    //-----------------------------------------------------------PLAYER/WORLD COLLIDER-------------------------------
    this.physics.world.setBounds(90, 60, 630, 440);
    this.player.setCollideWorldBounds(true);

    //-----------------------------------------------------------ADD TORCH and FLAME SPRITES--------------------------------
    this.torch = this.add.container(0, 0);
    this.torchHandle = this.physics.add.sprite(0, 0, "torch_handle");
    this.torchHandle.setScale(1.2);
    this.torchHandle.setOrigin(0.5, 1);
    animations(this.torchHandle, "flame");

    this.torch.add(this.torchHandle);
    this.torchHandle.play("flame");

    this.torchFollowPlayer();

    //--------------------------------------------------------------------Allows Torch to rotate with mouse cursor
    this.input.on("pointermove", (pointer) => {
      const angle = Phaser.Math.Angle.Between(
        this.torch.x,
        this.torch.y,
        pointer.x,
        pointer.y
      );
      // --------------------------------------------------------Makes torch follow mouse cursor---------------------------------------
      this.torch.setAngle(Phaser.Math.RadToDeg(angle) + 90);
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.player.play("idle");

    this.time.addEvent({
      delay: 6000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: this.isSpawn,
    });

    //---------------------------------------------------------Event Listener to Shoot Fireball with delay
    this.input.on("pointerdown", () => {
      if (this.canShoot) {
        this.shootFireball();
        this.canShoot = false;
        this.time.delayedCall(1000, () => {
          this.canShoot = true;
        });
      }
    });
    //-----------------------------------------------------------FIREBALL/ENEMY COLLIDER-------------------------------
    this.physics.add.collider(
      this.acidEnemies,
      this.fireball,
      this.destroyEnemy,
      null,
      this
    );
  }
  //--------------------------------------------------------------UPDATE FUNCTION -------------------------------------------
  update() {
    this.torchFollowPlayer();

    this.acidEnemies.children.iterate((enemy) => {
      this.physics.moveToObject(enemy, this.player);
      enemy.setScale(2.2);
      enemy.body.setSize(12, 12);
    });

    this.currency.children.iterate((gem) => {
      gem.setScale(0.75);
      gem.body.setSize(20, 30);
    });

    this.fireball.children.iterate((flame) => {
      //---------------------------------------------DESTROYS FIREBALL IF OFF SCREEN -----------------------------------------------
      if (flame) {
        if (flame.x < 0 || flame.x > 800 || flame.y < 0 || flame.y > 600) {
          flame.destroy();
        }
      } else {
        return;
      }
    });

    playerMovement(this);
  }

  torchFollowPlayer() {
    this.torch.x = this.player.x;
    this.torch.y = this.player.y;
  }

  //------------------------------------------------------------CURRENCY SPAWN--------------------------
  spawnCurrency() {
    let randX = Math.floor(Math.random() * 600) + 80;
    let randY = Math.floor(Math.random() * 400) + 80;
    let x = randX;
    let y = randY;

    const gem = this.currency.get(x, y);

    if (gem) {
      gem.setActive(true);
      gem.setVisible(true);
    }
  }
  //------------------------------------------------------------ENEMY SPAWN ----------------------------------------
  spawnEnemy() {
    let randX = Math.floor(Math.random() * 650) + 50;
    const x = randX;
    const y = 55;
    const acid = this.acidEnemies.get(x, y);

    if (acid) {
      acid.setActive(true);
      acid.setVisible(true);
      acid.body.setVelocityY(100);
      animations(acid, "idle_ooze");
      acid.play("idle_ooze");
    } else {
      acid.destroy();
    }
  }

  destroyCurrency(player, currency) {
    this.gemPickup.play();
    this.collectCurrency();
    currency.destroy();
  }

  collectCurrency() {
    this.score += 100;
    this.updateScore(this.score);
    this.totalCurrency += 1;
    this.updateCurrency(this.totalCurrency);
  }

  loseLive() {
    if (!this.canLoseLife) {
      return;
    }

    this.canLoseLife = false; // Set the cooldown flag

    this.lives -= 1;
    const currentVelocityX = this.player.body.velocity.x;
    const currentVelocityY = this.player.body.velocity.y;
    const newVelocityX = currentVelocityX > 0 ? -200 : 200;
    const newVelocityY = currentVelocityY > 0 ? 200 : -200;
    this.player.setVelocityX(newVelocityX);
    this.player.setVelocityY(newVelocityY);
    this.updateLives(this.lives);
    this.hit.play();

    const originalTint = this.player.tint;
    this.player.setTint(0xff0000);

    this.time.delayedCall(500, () => {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.setTint(originalTint);
      this.canLoseLife = true;
    });
  }

  shootFireball() {
    const x = this.torch.x;
    const y = this.torch.y;

    const angle = Phaser.Math.Angle.Between(x, y, this.input.x, this.input.y);
    const flames = this.fireball.get(x, y);
    if (flames) {
      flames.setActive(true);
      flames.setVisible(true);
      flames.setScale(1.5);
      flames.body.setSize(10, 15);
      this.shootfire.play();

      this.physics.velocityFromAngle(
        Phaser.Math.RadToDeg(angle),
        350,
        flames.body.velocity
      );
    }
  }

  destroyEnemy(acidEnemies, fireball) {
    acidEnemies.destroy();
    fireball.destroy();
    this.score += 10;
    this.updateScore(this.score);
    this.enemyExplosion.play();
  }
}

export default GameScene;
