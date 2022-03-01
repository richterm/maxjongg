import { TilePair } from "./utils";

export type SeasonTiles =
  | "SeasonsSpring"
  | "SeasonsSummer"
  | "SeasonsAutumn"
  | "SeasonsWinter";

export type FlowerTiles =
  | "FlowersPlum"
  | "FlowersOrchid"
  | "FlowersChrysanthemum"
  | "FlowersBamboo";

export type TileValue =
  | "Dots1"
  | "Dots2"
  | "Dots3"
  | "Dots4"
  | "Dots5"
  | "Dots6"
  | "Dots7"
  | "Dots8"
  | "Dots9"
  | "Bamboo1"
  | "Bamboo2"
  | "Bamboo3"
  | "Bamboo4"
  | "Bamboo5"
  | "Bamboo6"
  | "Bamboo7"
  | "Bamboo8"
  | "Bamboo9"
  | "Characters1"
  | "Characters2"
  | "Characters3"
  | "Characters4"
  | "Characters5"
  | "Characters6"
  | "Characters7"
  | "Characters8"
  | "Characters9"
  | "WindsEast"
  | "WindsSouth"
  | "WindsWest"
  | "WindsNorth"
  | "DragonsRed"
  | "DragonsGreen"
  | "DragonsWhite"
  | SeasonTiles
  | FlowerTiles;

export type Slot = {
  x: number;
  y: number;
  z: number;
};

export type BoardDefinition = {
  name: string;
  slots: Array<Slot>;
  tiles: Array<TileValue>;
};

export type BoardAction =
  | {
      type: "Select";
      tile: TileType;
    }
  | {
      type: "Hint";
      tiles: [TileType, TileType];
    };

export type TileType = Slot & {
  value?: TileValue;
};

export type BoardState = {
  tiles: Array<TileType>;
  selected?: TileType;
  hints: TilePair;
};
