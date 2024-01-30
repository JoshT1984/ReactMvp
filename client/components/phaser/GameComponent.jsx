import React, { useState, useEffect } from "react";
import GameScene from "./GameScene";
import Phaser from "phaser";
import "./phaser.css";
import Score from "../compLevels/_ThirdLevel/Score.jsx";
import Lives from "../compLevels/_ThirdLevel/Lives.jsx";
import Gem_Currency from "../compLevels/_ThirdLevel/Gem_Currency.jsx";

const GameComponent = () => {
  const [currentScore, setScore] = useState(0);
  const [currentCurrency, setCurrency] = useState(0);
  const [currentLives, setLives] = useState(3);

  const updateScore = (newScore) => {
    setScore(newScore);
  };
  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };
  const updateLives = (newLives) => {
    setLives(newLives);
  };
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 800,
      height: 600,
      scene: [new GameScene(updateScore, updateCurrency, updateLives)],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div>
      <div id="phaser-container" />
      <Score score={currentScore} updateScore={updateScore} />
      <Gem_Currency
        currency={currentCurrency}
        updateCurrency={updateCurrency}
      />
      <Lives lives={currentLives} updateLives={updateLives} />
    </div>
  );
};

export default GameComponent;
