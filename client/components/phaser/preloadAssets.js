// preloadAssets.js
import Phaser from "phaser";

function preloadAssets(scene) {
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

  scene.load.audio("gemCollect", "../../audio/gem_pickup.mp3");
}

export default preloadAssets;
