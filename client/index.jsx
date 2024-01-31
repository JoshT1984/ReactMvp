import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/compLevels/_firstLevel/App.jsx";
import { AudioProvider } from "./components/compLevels/_firstLevel/AudioContext.jsx";

const root = document.getElementById("root");

// Replace ReactDOM.render with createRoot
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>
);

// createRoot(document.getElementById("root")).render(<App />);
