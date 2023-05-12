import { describe, test, expect } from "vitest";
import { getBoardIntegrity } from "../board";
import { TriangleBoard } from "./TriangleBoard";

describe("TriangleBoard", () => {
  test("integrity is given", () => {
    expect(getBoardIntegrity(TriangleBoard)).toEqual({
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
