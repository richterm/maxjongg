import type { BoardDefinition, BoardState } from "./types";
import { shuffle } from "./utils";

export const getBoardRows = (boardDefinition: BoardDefinition) => {
  const slotYs = boardDefinition.slots.map((slot) => slot.y);
  const minY = Math.min(...slotYs);
  const maxY = Math.max(...slotYs) + 2;
  return maxY - minY;
};

export const getBoardColumns = (boardDefinition: BoardDefinition) => {
  const slotXs = boardDefinition.slots.map((slot) => slot.x);
  const minX = Math.min(...slotXs);
  const maxX = Math.max(...slotXs) + 2;
  return maxX - minX;
};

export const createInitialState = (board: BoardDefinition) => {
  const copy = { ...board, tiles: shuffle(board.tiles) };
  const result: BoardState = {
    tiles: copy.slots.map((slot, idx) => ({
      ...slot,
      value: copy.tiles[idx],
    })),
    selected: undefined,
    hints: undefined,
  };
  return result;
};
