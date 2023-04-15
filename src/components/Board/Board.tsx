import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei/core";
import { Tile } from "../Tile/Tile";
import type { BoardState, TileType } from "../../types";
import { areEqualTiles, isTileHinted } from "../../tiles";
import { Dimensions } from "../../board";

type OnTileClickType = (tile: TileType) => void;

type BoardProps = {
  boardState: BoardState;
  onTileClick: OnTileClickType;
  dimensions: Dimensions;
};

export const Board: FC<BoardProps> = ({
  boardState,
  dimensions,
  onTileClick,
}) => {
  return (
    <Canvas
      camera={{
        fov: 35,
        position: [6, -6, 45],
        far: 1000,
        near: 0.1,
      }}
    >
      <pointLight position={[0, 0, 100]} intensity={0.5} color={"white"} />
      <Bounds fit observe margin={0.6}>
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
      </Bounds>
    </Canvas>
  );
};
