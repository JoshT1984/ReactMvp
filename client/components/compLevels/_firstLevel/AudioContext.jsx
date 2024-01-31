import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioInstances, setAudioInstances] = useState([]);

  const playAudio = (src) => {
    const audio = new Audio(src);
    audio.play();
    setAudioInstances((prevInstances) => [...prevInstances, audio]);
  };

  const stopAllAudio = () => {
    audioInstances.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setAudioInstances([]);
  };

  return (
    <AudioContext.Provider value={{ playAudio, stopAllAudio }}>
      {children}
    </AudioContext.Provider>
  );
};