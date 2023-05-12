import { describe, test, expect } from "vitest";
import { fullClassicTileSet } from "./tilesets";
import { alltileValuesMatchable } from "../board";

describe("Classic Tile Set", () => {
  test("integrity is given", () => {
    expect(alltileValuesMatchable(fullClassicTileSet).result).toEqual(true);
  });
});
