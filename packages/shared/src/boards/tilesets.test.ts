import { describe, test, expect } from "vitest";
import { fullClassicTileSet, minimalClassicTileSet } from "./tilesets";
import { alltileValuesMatchable } from "../board";

describe("Full Classic Tile Set", () => {
  test("integrity is given", () => {
    expect(alltileValuesMatchable(fullClassicTileSet).result).toEqual(true);
  });
});

describe("Minimal Classic Tile Set", () => {
  test("integrity is given", () => {
    expect(alltileValuesMatchable(minimalClassicTileSet).result).toEqual(true);
  });
});
