import { describe, test, expect } from "vitest";
import { getBoardIntegrity } from "../board";
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
