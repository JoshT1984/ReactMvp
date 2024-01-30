import React, { useState, useEffect } from "react";
import GameScene from "./GameScene";
import Phaser from "phaser";
import "./phaser.css";
import Score from "../compLevels/_ThirdLevel/Score";
import Gem_Currency from "../compLevels/_ThirdLevel/Gem_Currency.jsx";

const GameComponent = () => {
  const [currentScore, setScore] = useState(0);
  const [currentCurrency, setCurrency] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
  };
  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    console.log(newCurrency);
  };
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 800,
      height: 600,
      scene: [new GameScene(updateScore, updateCurrency)],
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
    </div>
  );
};

export default GameComponent;
