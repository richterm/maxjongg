import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, CameraControls, OrbitControls } from "@react-three/drei/core";
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
        fov: 25,
        position: [0, 0, 40],
      }}
    >
      <OrbitControls makeDefault dampingFactor={0.1} />
      <pointLight position={[0, 0, 100]} intensity={1} color={"white"} />
      <Bounds fit observe margin={1} clip>
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
