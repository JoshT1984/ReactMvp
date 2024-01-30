import Phaser from "phaser";
import playerMovement from "./playerMovement.js";
import preloadAssets from "./preloadAssets.js";
import animations from "./animations.js";
import Enemy from "./Enemy.jsx";
import Currency from "./Currency.jsx";
let isSpawn = true;

class GameScene extends Phaser.Scene {
  preload() {
    preloadAssets(this);
  }

  create() {
    //----------------------------------ADD SFX----------------------------
    this.gemPickup = this.sound.add("gemCollect");
    this.speed = 3;
    //--------------------CREATE BACKGROUNDS--------------------------------
    const bgImage = this.add.image(0, 0, "background");
    bgImage.setOrigin(0, 0);

    //CREATE GAMECURRENCY WITH SPAWNER---------------------------------------
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
      loop: isSpawn,
    });

    // this.physics.add.overlap(
    //   this.player,
    //   this.currency,
    //   this.destroyCurrency,
    //   null,
    //   this
    // );

    //---------------ENEMIES-------------------------------

    this.acidEnemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
    });
    this.acidEnemies.children.iterate((enemy) => {
      enemy.play("idle_ooze");
      enemy.setScale(2);
    });

    //-------------------PLAYER-------------------------------
    this.player = this.physics.add.sprite(400, 550, "player");
    this.physics.add.collider(
      this.player,
      this.currency,
      this.destroyCurrency,
      null,
      this
    );
    this.player.body.setSize(10, 20);
    // this.player.setoffset(45, 0);
    animations(this.player, "idle");
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

    this.player.play("idle");

    this.time.addEvent({
      delay: 6000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: isSpawn,
    });
  }
  //////////////////////////////////////UPDATE//////////////////////////////////////////////
  update() {
    this.acidEnemies.children.iterate((enemy) => {
      this.physics.moveToObject(enemy, this.player);
      enemy.setScale(2.2);
      enemy.body.setSize(12, 12);
    });

    this.currency.children.iterate((gem) => {
      gem.setScale(0.75);
      gem.body.setSize(20, 30);
    });

    playerMovement(this);
    // this.enemyFollows();
  }
  //-----------------CURRENCY SPAWN--------------------------
  spawnCurrency() {
    let randX = Math.floor(Math.random() * 700) + 50;
    let randY = Math.floor(Math.random() * 450) + 55;
    let x = randX;
    let y = randY;

    const gem = this.currency.get(x, y);

    if (gem) {
      gem.setActive(true);
      gem.setVisible(true);
    }
  }
  //-------------------ENEMY SPAWN ----------------------------------------
  spawnEnemy() {
    let randX = Math.floor(Math.random() * 700) + 50;
    const x = randX;
    const y = 55;
    const acid = this.acidEnemies.get(x, y);

    if (acid) {
      acid.setActive(true);
      acid.setVisible(true);
      acid.body.setVelocityY(100);
      animations(acid, "idle_ooze");
      acid.play("idle_ooze");
    }
  }

  destroyCurrency(player,currency) {
    this.gemPickup.play();
    currency.destroy();
  }
}

export default GameScene;
