import type { BoardDefinition, BoardState, TilePair } from "./types";
import { shuffle } from "./utils";
import { isSelectable, tileValuesMatch } from "./tiles";

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
      visible: true
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
