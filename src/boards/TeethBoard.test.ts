import { getBoardIntegrity } from "../tools/getBoardIntegrity";
import { TeethBoard } from "./TeethBoard";

describe("TeethBoard", () => {
  test("integrity is given", () => {
    expect(getBoardIntegrity(TeethBoard)).toEqual({
      allTilesMatchable: {
        result: true,
        noMatchFor: [],
      },
      overlaps: false,
      tileCountEqualsSlotCount: true,
      tileCount: 144,
      slotCount: 144,
    });
  });
});
