class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "acid"); // 'enemy' is the key of the enemy sprite in your preload function
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.setVelocityY(100); // Initial velocity to move to the left
  }
  update() {
  }
}

export default Enemy;
