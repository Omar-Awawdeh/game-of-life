import type { Cell } from "../types/Cell";

export const createCell = (x: number, y: number, isAlive = false): Cell => {
  return {
    column: x,
    row: y,
    id: Math.random().toString(),
    isAlive,
  };
};
