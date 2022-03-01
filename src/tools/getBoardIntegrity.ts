import { BoardDefinition, Slot, TileType, TileValue } from "../types";
import { tilesMatch } from "../tiles";

export const overlap = (slot1: Slot, slot2: Slot) => {
  const xDifference = Math.abs(slot1.x - slot2.x);
  const yDifference = Math.abs(slot1.y - slot2.y);
  return xDifference < 2 && yDifference < 2 && slot1.z === slot2.z;
};

export const anyOverlaps = (tiles: Array<TileType>) =>
  tiles.some((tile1, idx, tiles) =>
    tiles.slice(idx + 1).some((tile2) => overlap(tile1, tile2))
  );

type ReducerPayload = {
  result: boolean;
  tiles: Array<TileValue>;
  noMatchFor: Array<TileValue>;
};

export const reducer = (
  acc: ReducerPayload,
  tile1: TileValue,
  idx: number,
  allTiles: Array<TileValue>
): ReducerPayload => {
  if (acc.tiles.length === 0) return acc;

  const firstMatchingIndex = acc.tiles
    .slice(1)
    .findIndex((tile2) => tilesMatch(tile1, tile2));

  if (firstMatchingIndex === -1) {
    const tiles = acc.tiles.slice(1);
    return tiles.reduce(reducer, {
      result: false,
      tiles,
      noMatchFor: [...acc.noMatchFor, tile1],
    });
  }

  const tiles = [
    ...acc.tiles.slice(1, firstMatchingIndex + 1),
    ...acc.tiles.slice(firstMatchingIndex + 2),
  ];

  return tiles.reduce(reducer, {
    result: acc.result,
    tiles,
    noMatchFor: acc.noMatchFor,
  });
};

export const allTilesMatchable = (tiles: Array<TileValue>) => {
  const { result, noMatchFor } = tiles.reduce(reducer, {
    result: true,
    tiles: [...tiles],
    noMatchFor: [],
  });
  return {
    result,
    noMatchFor,
  };
};

export const getBoardIntegrity = (boardDefinition: BoardDefinition) => {
  return {
    tileCount: boardDefinition.tiles.length,
    slotCount: boardDefinition.slots.length,
    tileCountEqualsSlotCount:
      boardDefinition.slots.length === boardDefinition.tiles.length,
    overlaps: anyOverlaps(boardDefinition.slots),
    allTilesMatchable: allTilesMatchable(boardDefinition.tiles),
  };
};
