import React, { FC, useState } from "react";
import { Properties } from "csstype";
import "./Tile.css";
import { TileValue } from "../../types";
import Measure, { BoundingRect } from "react-measure";
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
  const [bounds, setBounds] = useState<BoundingRect | undefined>();
  if (!value) return null;

  const SVG = SVGTiles[value];

  return (
    <Measure bounds onResize={({ bounds }) => setBounds(bounds)}>
      {({ measureRef }) => (
        <div
          ref={measureRef}
          className="tile"
          onClick={onClick}
          style={
            {
              "--highlighted": selected || hinted ? 1 : undefined,
              "--tile-width": bounds?.width,
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
      )}
    </Measure>
  );
};
