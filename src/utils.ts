import { isSelectable, tilesMatch } from "./tiles";
import { BoardState, TileType } from "./types";

export const shuffle = (a: Array<any>) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

export type TilePair = [TileType, TileType] | undefined;

export const getHints = (boardState: BoardState): TilePair => {
  const { tiles } = boardState;
  const selectableTiles = tiles.filter((tile) =>
    isSelectable(boardState, tile)
  );

  let pair: TilePair;

  selectableTiles.some((outerItem, idx, selectableTiles) =>
    selectableTiles.slice(idx + 1).some((innerItem) => {
      const result = tilesMatch(innerItem.value, outerItem.value);
      if (result) pair = [outerItem, innerItem];

      return result;
    })
  );

  return pair;
};
