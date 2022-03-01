import { getBoardIntegrity } from "../tools/getBoardIntegrity";
import { GreatWallBoard } from "./GreatWallBoard";

describe("GreatWallBoard", () => {
  test("integrity is given", () => {
    expect(getBoardIntegrity(GreatWallBoard)).toEqual({
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
