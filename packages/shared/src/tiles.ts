import type {
  BoardState,
  FlowerTiles,
  SeasonTiles,
  TileType,
  TileValue,
} from "./types";

export const TILE_HEIGHT = 1;
export const TILE_WIDTH = 1;
export const TILE_DEPTH = 1;

export const hasLeftNeighbors = (boardState: BoardState, tile: TileType) => {
  const candidates = boardState.tiles.filter(
    (tileOnBoard) =>
      tileOnBoard.x === tile.x - TILE_WIDTH &&
      [tile.y, tile.y - TILE_HEIGHT / 2, tile.y + TILE_HEIGHT / 2].includes(
        tileOnBoard.y
      ) &&
      tileOnBoard.z === tile.z
  );
  const result = candidates.some((tileOnBoard) => tileOnBoard.visible);
  return result;
};

export const hasRightNeighbors = (boardState: BoardState, tile: TileType) => {
  const candidates = boardState.tiles.filter(
    (tileOnBoard) =>
      tileOnBoard.x === tile.x + TILE_WIDTH &&
      [tile.y, tile.y - TILE_HEIGHT / 2, tile.y + TILE_HEIGHT / 2].includes(
        tileOnBoard.y
      ) &&
      tileOnBoard.z === tile.z
  );
  const result = candidates.some((tileOnBoard) => tileOnBoard.visible);
  return result;
};

export const hasTilesOnTop = (boardState: BoardState, tile: TileType) => {
  const result = boardState.tiles
    .filter(
      (tileOnBoard) =>
        tileOnBoard.z === tile.z + TILE_DEPTH &&
        [tile.x - TILE_WIDTH / 2, tile.x, tile.x + TILE_WIDTH / 2].includes(
          tileOnBoard.x
        ) &&
        [tile.y - TILE_HEIGHT / 2, tile.y, tile.y + TILE_HEIGHT / 2].includes(
          tileOnBoard.y
        )
    )
    .some((tileOnBoard) => tileOnBoard.visible);
  return result;
};

export const tilesHaveEqualCoords = (tile1: TileType, tile2: TileType) => {
  return tile1.x === tile2.x && tile1.y === tile2.y && tile1.z === tile2.z;
};

export const areEqualTiles = (tile1: TileType, tile2: TileType) => {
  return tilesHaveEqualCoords(tile1, tile2) && tile1.value === tile2.value;
};

export const isSelectable = (boardState: BoardState, tile: TileType) => {
  return (
    tile.visible &&
    (!hasLeftNeighbors(boardState, tile) ||
      !hasRightNeighbors(boardState, tile)) &&
    !hasTilesOnTop(boardState, tile)
  );
};

export const isSeasonTile = (
  tile: TileValue | undefined
): tile is SeasonTiles => {
  return (
    tile === "SeasonsAutumn" ||
    tile === "SeasonsSpring" ||
    tile === "SeasonsSummer" ||
    tile === "SeasonsWinter"
  );
};

export const isFlowerTile = (
  tile: TileValue | undefined
): tile is FlowerTiles => {
  return (
    tile === "FlowersBamboo" ||
    tile === "FlowersChrysanthemum" ||
    tile === "FlowersOrchid" ||
    tile === "FlowersPlum"
  );
};

export const tileValuesMatch = (
  value1: TileValue | undefined,
  value2: TileValue | undefined
) => {
  if (isSeasonTile(value1) && isSeasonTile(value2)) return true;
  if (isFlowerTile(value1) && isFlowerTile(value2)) return true;
  return value1 === value2;
};

export const isTileHinted = (boardState: BoardState, tile: TileType) => {
  if (boardState.hints === undefined) return false;

  return (
    areEqualTiles(tile, boardState.hints![0]) ||
    areEqualTiles(tile, boardState.hints![1])
  );
};

const hue = 263;
const saturation = "15%";

export enum Color {
  lighter = `hsl(${hue}, ${saturation}, 50%)`,
  light = `hsl(${hue}, ${saturation}, 30%)`,
  dark = `hsl(${hue}, ${saturation}, 18%)`,
  darker = `hsl(${hue}, ${saturation}, 4%)`,
}

export const getTileColors = ({
  darkMode,
  selected,
  hinted,
}: {
  selected: boolean;
  hinted: boolean;
  darkMode: boolean;
}) => {
  const baseColor = darkMode ? Color.dark : Color.light;
  const highlightColor = darkMode ? Color.light : Color.lighter;

  return {
    edges: darkMode ? Color.darker : Color.dark,
    faces: selected || hinted ? highlightColor : baseColor,
  };
};
