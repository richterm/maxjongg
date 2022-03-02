import { Properties } from "csstype";
import React, { FC, useReducer } from "react";
import { Board } from "../Board/Board";
import "./Game.css";
import type { BoardDefinition } from "../../types";
import {
  createInitialState,
  getBoardColumns,
  getBoardRows,
  getHints,
} from "../../board";
import { reducer } from "./reducer";

type GameProps = {
  boardDefinition: BoardDefinition;
};

export const Game: FC<GameProps> = ({ boardDefinition }) => {
  const [boardState, dispatch] = useReducer(
    reducer,
    boardDefinition,
    createInitialState
  );

  const showHint = React.useCallback(() => {
    const hints = getHints(boardState);

    if (hints === undefined) return;
    dispatch({ type: "Hint", tiles: hints });
  }, [boardState]);

  return (
    <div className="game" onDoubleClick={showHint}>
      <Board
        style={
          {
            "--board-columns": getBoardColumns(boardDefinition),
            "--board-rows": getBoardRows(boardDefinition),
          } as Properties
        }
        boardState={boardState}
        onTileClick={(tile) => dispatch({ tile, type: "Select" })}
      />
    </div>
  );
};
