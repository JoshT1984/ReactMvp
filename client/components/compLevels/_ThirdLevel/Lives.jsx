import "../../../css/lives.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Lives = ({ lives, updateLives}) => {
  const updateLivesLocal = (newLives) => {
    updateLives(newLives);
  };

  return (
    <>
      <div id="lives">Lives: {lives}</div>
    </>
  );
};

export default Lives;
