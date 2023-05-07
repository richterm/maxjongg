import { describe, test, expect } from "vitest";
import { getBoardIntegrity } from "../board";
import { ClassicBoard } from "./ClassicBoard";

describe("ClassicBoard", () => {
  test("integrity is given", () => {
    expect(getBoardIntegrity(ClassicBoard)).toEqual({
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
