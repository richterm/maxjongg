import React from "react";
import "./App.css";
import { Game } from "./components/Game/Game";
import boards from "./boards";
import { getRandomIndex } from "./utils";
import { GithubBanner } from "./components/GithubBanner/GithubBanner";

const App: React.FC = () => {
  const boardsIdx = getRandomIndex(boards.length);
  return (
    <div className="App">
      <GithubBanner />
      <Game boardDefinition={boards[boardsIdx]} />
    </div>
  );
};

export default App;
