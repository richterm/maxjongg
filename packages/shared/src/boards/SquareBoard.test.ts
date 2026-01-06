import { describe, test, expect } from "vitest";
import { getBoardIntegrity } from "../board";
import { SquareBoard } from "./SquareBoard";

describe("SquareBoard", () => {
  test("integrity is given", () => {
    expect(getBoardIntegrity(SquareBoard)).toEqual({
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
