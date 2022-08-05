import React, { FC } from "react";
import { Properties } from "csstype";
import "./Tile.css";
import type { TileValue } from "../../types";
import SVGTiles from "../../assets/tiles/svg";

type TileProps = {
  value?: TileValue;
  x: number;
  y: number;
  z: number;
  hinted?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export const Tile: FC<TileProps> = ({
  value,
  x,
  y,
  z,
  hinted = false,
  selected = false,
  onClick = () => {},
}) => {
  if (!value) return null;

  const SVG = SVGTiles[value];
  return (
    <div
      className="tile"
      onClick={onClick}
      style={
        {
          "--highlighted": selected || hinted ? 1 : undefined,
          "--x": x,
          "--y": y,
          "--z": z,
        } as Properties
      }
    >
      <div className="face front">
        <SVG />
      </div>
      <div className="face right"></div>
      <div className="face bottom"></div>
    </div>
  );
};
