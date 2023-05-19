import * as React from "react";
import "./App.css";
import { Game } from "./components/Game/Game";
import { boards, getRandomIndex } from "shared";
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
