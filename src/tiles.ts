import type {
  BoardState,
  FlowerTiles,
  SeasonTiles,
  TileType,
  TileValue,
} from "./types";

export const hasLeftNeighbors = (boardState: BoardState, tile: TileType) => {
  const candidates = boardState.tiles.filter(
    (tileOnBoard) =>
      tileOnBoard.x === tile.x - 2 &&
      [tile.y, tile.y - 1, tile.y + 1].includes(tileOnBoard.y) &&
      tileOnBoard.z === tile.z
  );
  const result = candidates.some(
    (tileOnBoard) => tileOnBoard.value !== undefined
  );
  return result;
};

export const hasRightNeighbors = (boardState: BoardState, tile: TileType) => {
  const candidates = boardState.tiles.filter(
    (tileOnBoard) =>
      tileOnBoard.x === tile.x + 2 &&
      [tile.y, tile.y - 1, tile.y + 1].includes(tileOnBoard.y) &&
      tileOnBoard.z === tile.z
  );
  const result = candidates.some(
    (tileOnBoard) => tileOnBoard.value !== undefined
  );
  return result;
};

export const hasTilesOnTop = (boardState: BoardState, tile: TileType) => {
  const result = boardState.tiles
    .filter(
      (tileOnBoard) =>
        tileOnBoard.z === tile.z + 1 &&
        [tile.x - 1, tile.x, tile.x + 1].includes(tileOnBoard.x) &&
        [tile.y - 1, tile.y, tile.y + 1].includes(tileOnBoard.y)
    )
    .some((tileOnBoard) => tileOnBoard.value !== undefined);
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
    tile.value !== undefined &&
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
