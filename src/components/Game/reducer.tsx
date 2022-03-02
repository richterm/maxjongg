import { BoardAction, BoardState } from "../../types";
import {
  areEqualTiles,
  isSelectable,
  tilesHaveEqualCoords,
  tileValuesMatch,
} from "../../tiles";

export const reducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "Hint":
      return {
        ...state,
        selected: undefined,
        hints: action.tiles,
      };
    default:
    case "Select":
      if (
        (state.selected && areEqualTiles(state.selected, action.tile)) ||
        !isSelectable(state, action.tile)
      )
        return state;
      if (!tileValuesMatch(action.tile.value, state.selected?.value)) {
        return {
          ...state,
          hints: undefined,
          selected: { ...action.tile },
        };
      }

      return {
        tiles: state.tiles.map((tile) =>
          tilesHaveEqualCoords(tile, action.tile) ||
          (state.selected !== undefined &&
            tilesHaveEqualCoords(tile, state.selected))
            ? {
                ...tile,
                value: undefined,
              }
            : tile
        ),
        hints: undefined,
        selected: undefined,
      };
  }
};
