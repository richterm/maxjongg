import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei/core";
import { Tile } from "../Tile/Tile";
import type { BoardState, TileType } from "../../types";
import { areEqualTiles, isTileHinted } from "../../tiles";

type OnTileClickType = (tile: TileType) => void;

type BoardProps = {
  boardState: BoardState;
  onTileClick: OnTileClickType;
  columns: number;
  rows: number;
};

export const Board: FC<BoardProps> = ({
  boardState,
  columns,
  rows,
  onTileClick,
}) => {
  return (
    <Canvas
      camera={{
        fov: 45,
        position: [columns / 2, rows / 2, 100],
      }}
    >
      <CameraControls />
      <pointLight
        position={[columns / 2 + 2, rows / 2 + 2, 10]}
        intensity={1}
        color={"#fefefe"}
      />
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
    </Canvas>
  );
};
