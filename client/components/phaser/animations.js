import Phaser from "phaser";

function animations(scene, animationKey) {
  scene.anims.create({
    key: "idle_ooze",
    frames: scene.anims.generateFrameNumbers("acid", {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: -1,
  });

  scene.anims.create({
    key: "idle",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 0,
      end: 24,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "flame",
    frames: scene.anims.generateFrameNumbers("torch_handle", {
      start: 0,
      end: 5,
    }),
    frameRate: 12,
    repeat: -1,
  });
}

export default animations;