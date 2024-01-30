class Currency extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "gem"); 
      scene.add.existing(this);
      scene.physics.world.enableBody(this);
    }
    update() {
    }
  }
  
  export default Currency;
  