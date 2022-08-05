import { Properties } from "csstype";
import React, { FC } from "react";
import { NaturalShadowFilter } from "../../assets/tiles/svg/common";
import "./Board.css";
import { Tile } from "../Tile/Tile";
import type { BoardState, TileType } from "../../types";
import { areEqualTiles, isTileHinted } from "../../tiles";
import Measure from "react-measure";

type OnTileClickType = (tile: TileType) => void;

type BoardProps = {
  boardState: BoardState;
  onTileClick: OnTileClickType;
  style?: Properties;
  columns: number;
  rows: number;
};

export const Board: FC<BoardProps> = ({
  boardState,
  columns,
  onTileClick,
  rows,
  style,
}) => {
  return (
    <Measure bounds>
      {({ measureRef, contentRect: { bounds } }) => (
        <div
          ref={measureRef}
          className="board"
          style={
            {
              ...style,
              "--red": "#ff7ebd",
              "--green": "#72f1b8",
              "--orange": "#fede5d",
              "--blue": "#03edf9",
              "--tile-color-hue": 263,
              "--tile-color-saturation": 27,
              "--tile-color-lightness": 18,
              "--tile-shadow-color": "rgba(255,255,255,.25)",
              "--tile-width": (bounds?.width ?? 0) / columns,
              "--board-columns": columns,
              "--board-rows": rows,
            } as Properties
          }
        >
          <NaturalShadowFilter />
          {boardState.tiles.map((tile) => {
            return (
              <Tile
                {...tile}
                key={`${tile.x}_${tile.y}_${tile.z}_${tile.value}`}
                selected={
                  boardState.selected !== undefined &&
                  areEqualTiles(boardState.selected, tile)
                }
                hinted={isTileHinted(boardState, tile)}
                onClick={() => onTileClick(tile)}
              />
            );
          })}
        </div>
      )}
    </Measure>
  );
};
