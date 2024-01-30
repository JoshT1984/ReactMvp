class Fireball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fireball"); // 'fireball' is the key of the fireball sprite in your preload function
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
  }
  update() {}
}

export default Fireball;
