import React, { FC, useReducer, useEffect, useRef } from "react";
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
import gsap from "gsap"
import { useInterval } from "usehooks-ts";
import { getRandomColor } from "../../utils";

type GameProps = {
  boardDefinition: BoardDefinition;
};

const duration = 3;

export const Game: FC<GameProps> = ({ boardDefinition }) => {
  const ref = useRef(null);
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

  useInterval(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, { "backgroundColor": getRandomColor(), duration, ease: "slow" })
    });
    return () => ctx.revert();
  }, duration * 1000);

  return (
    <div className="game" onDoubleClick={showHint} ref={ref}>
      <Board
        boardState={boardState}
        columns={getBoardColumns(boardDefinition)}
        rows={getBoardRows(boardDefinition)}
        onTileClick={(tile) => dispatch({ tile, type: "Select" })}
      />
    </div>
  );
};
