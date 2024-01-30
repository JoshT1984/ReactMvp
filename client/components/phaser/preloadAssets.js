// preloadAssets.js
import Phaser from "phaser";

function preloadAssets(scene) {
  scene.load.image(
    "fireball",
    "../../images/spritesheets/fireball.png"
  );
  scene.load.image(
    "background",
    "../../images/backgrounds/main_background.png"
  );
  scene.load.image("gem", "../../images/spritesheets/blue_gem.png");
  scene.load.spritesheet(
    "player",
    "../../images/spritesheets/player_spritesheet.png",
    { frameWidth: 50, frameHeight: 50 }
  );
  scene.load.spritesheet("acid", "../../images/spritesheets/acid_ooze.png", {
    frameWidth: 16,
    frameHeight: 16,
  });
 
  scene.load.spritesheet("torch_handle", "../../images/spritesheets/torch.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  scene.load.audio("gemCollect", "../../audio/gem_pickup.mp3");
  scene.load.audio("enemyExplosion", "../../audio/explosion.wav");
  scene.load.audio("shootfire", "../../audio/shootfire.wav");
}

export default preloadAssets;
