import React, { FC, useReducer, useRef } from "react";
import { Board } from "../Board/Board";
import "./Game.css";
import {
  type BoardDefinition,
  createInitialState,
  getBoardDimensions,
  getHints,
} from "shared";
import { reducer } from "./reducer";

type GameProps = {
  boardDefinition: BoardDefinition;
};

export const Game: FC<GameProps> = ({ boardDefinition }) => {
  const ref = useRef(null);
  const dimensions = getBoardDimensions(boardDefinition);
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
    <div
      className="game"
      style={{ aspectRatio: `${dimensions.maxs.x} / ${dimensions.maxs.y}` }}
      onDoubleClick={showHint}
      ref={ref}
    >
      <Board
        dimensions={dimensions}
        boardState={boardState}
        onTileClick={(tile) => dispatch({ tile, type: "Select" })}
      />
    </div>
  );
};
