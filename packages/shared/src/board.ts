import type {
  BoardDefinition,
  BoardState,
  Slot,
  TileValue,
  TilePair,
} from "./types";
import { shuffle } from "./utils";
import { TILE_DEPTH, TILE_HEIGHT, TILE_WIDTH, isSelectable, tileValuesMatch } from "./tiles";

export type Dimensions = {
  mins: {
    x: number;
    y: number;
    z: number;
  };
  maxs: {
    x: number;
    y: number;
    z: number;
  };
  avgs: {
    x: number;
    y: number;
    z: number;
  };
};

export const getBoardDimensions = (
  boardDefinition: BoardDefinition
): Dimensions => {
  const slotXs = boardDefinition.slots.map((slot) => slot.x);
  const minX = Math.min(...slotXs);
  const maxX = Math.max(...slotXs) + TILE_WIDTH;

  const slotYs = boardDefinition.slots.map((slot) => slot.y);
  const minY = Math.min(...slotYs);
  const maxY = Math.max(...slotYs) + TILE_HEIGHT;

  const slotZs = boardDefinition.slots.map((slot) => slot.z);
  const minZ = Math.min(...slotZs);
  const maxZ = Math.max(...slotZs) + TILE_DEPTH;

  return {
    mins: {
      x: minX,
      y: minY,
      z: minZ,
    },
    maxs: {
      x: maxX,
      y: maxY,
      z: maxZ,
    },
    avgs: {
      x: maxX - minX / 2,
      y: maxY - minY / 2,
      z: maxZ - minZ / 2,
    },
  };
};

export const createInitialState = (board: BoardDefinition) => {
  const copy = { ...board, tiles: shuffle(board.tiles) };
  const result: BoardState = {
    tiles: copy.slots.map((slot, idx) => ({
      ...slot,
      value: copy.tiles[idx],
      visible: true,
    })),
    selected: undefined,
    hints: undefined,
  };
  return result;
};

export const getHints = (boardState: BoardState): TilePair => {
  const { tiles } = boardState;
  const selectableTiles = tiles.filter((tile) =>
    isSelectable(boardState, tile)
  );

  let pair: TilePair;

  selectableTiles.some((outerItem, idx, selectableTiles) =>
    selectableTiles.slice(idx + 1).some((innerItem) => {
      const result = tileValuesMatch(innerItem.value, outerItem.value);
      if (result) pair = [outerItem, innerItem];

      return result;
    })
  );

  return pair;
};

export const getBoundsMargin = (dimensions: Dimensions) => {
  const min = Math.min(dimensions.maxs.x, dimensions.maxs.y);
  const max = Math.max(dimensions.maxs.x, dimensions.maxs.y);
  const margin = Math.ceil((min / max) * 10) / 10;

  return margin;
};

export const overlap = (slot1: Slot, slot2: Slot) => {
  const xDifference = Math.abs(slot1.x - slot2.x);
  const yDifference = Math.abs(slot1.y - slot2.y);
  return xDifference < TILE_WIDTH && yDifference < TILE_HEIGHT && slot1.z === slot2.z;
};

export const anyOverlaps = (tiles: Array<Slot>) =>
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
  tile1: TileValue
): ReducerPayload => {
  if (acc.tiles.length === 0) return acc;

  const firstMatchingIndex = acc.tiles
    .slice(1)
    .findIndex((tile2) => tileValuesMatch(tile1, tile2));

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

export const alltileValuesMatchable = (tiles: Array<TileValue>) => {
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
    allTilesMatchable: alltileValuesMatchable(boardDefinition.tiles),
  };
};
