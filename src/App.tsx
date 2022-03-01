import React from "react";
import "./App.css";
import { Game } from "./components/Game/Game";
import boards from "./boards";
import { getRandomIndex } from "./utils";

function App() {
  const boardsIdx = getRandomIndex(boards.length);
  return (
    <div className="App">
      <Game boardDefinition={boards[boardsIdx]} />
    </div>
  );
}

export default App;
