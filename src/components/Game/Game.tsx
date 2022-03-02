import { Properties } from "csstype";
import React, { FC, useReducer } from "react";
import { Board } from "../Board/Board";
import "./Game.css";
import {
  BoardAction,
  BoardDefinition,
  BoardState,
  TileType,
} from "../../types";
import {
  createInitialState,
  getBoardColumns,
  getBoardRows,
  getHints,
} from "../../board";
import { areEqualTiles, isSelectable, tileValuesMatch } from "../../tiles";

type GameProps = {
  boardDefinition: BoardDefinition;
};

const reducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "Hint":
      return {
        ...state,
        selected: undefined,
        hints: action.tiles,
      };
    default:
    case "Select":
      if (
        (state.selected && areEqualTiles(state.selected, action.tile)) ||
        !isSelectable(state, action.tile)
      )
        return state;
      if (!tileValuesMatch(action.tile.value, state.selected?.value)) {
        return {
          ...state,
          hints: undefined,
          selected: { ...action.tile },
        };
      }

      const isTileSelectedFirst = (tile: TileType) =>
        tile.x === action.tile.x &&
        tile.y === action.tile.y &&
        tile.z === action.tile.z;

      const isTileSelectedSecond = (tile: TileType) =>
        tile.x === state.selected?.x &&
        tile.y === state.selected?.y &&
        tile.z === state.selected?.z;

      return {
        tiles: state.tiles.map((tile) =>
          isTileSelectedFirst(tile) || isTileSelectedSecond(tile)
            ? {
                ...tile,
                value: undefined,
              }
            : tile
        ),
        hints: undefined,
        selected: undefined,
      };
  }
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
