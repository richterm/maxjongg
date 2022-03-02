import React from "react";
import "./App.css";
import { Game } from "./components/Game/Game";
import boards from "./boards";
import { getRandomIndex } from "./utils";
import GithubCorner from "react-github-corner";

function App() {
  const boardsIdx = getRandomIndex(boards.length);
  return (
    <div className="App">
      <GithubCorner
        href="https://github.com/richterm/maxjongg"
        bannerColor="#2b223a"
        octoColor="#03edf9"
      />
      <Game boardDefinition={boards[boardsIdx]} />
    </div>
  );
}

export default App;
