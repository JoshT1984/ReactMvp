import Phaser from "phaser";
import GameScene from "./GameScene.jsx";

function playerMovement(scene) {
  const cursors = scene.cursors;
  const keys = scene.keys;

  if (cursors.left.isDown || keys.left.isDown) {
    scene.player.x -= scene.speed;
  }
  if (cursors.right.isDown || keys.right.isDown) {
    scene.player.x += scene.speed;
  }
  if (cursors.down.isDown || keys.down.isDown) {
    scene.player.y += scene.speed;
  }
  if (cursors.up.isDown || keys.up.isDown) {
    scene.player.y -= scene.speed;
  }
}

export default playerMovement;
