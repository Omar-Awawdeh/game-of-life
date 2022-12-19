import type { Cell } from "../types/Cell";

export const createCell = (x: number, y: number, isAlive = false): Cell => {
  return {
    column: y,
    row: x,
    id: Math.random().toString(),
    isAlive,
  };
};
