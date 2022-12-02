import type { Cell } from "../types/Cell";
import { generateNeighborCells } from "./generateNeighborCells";
import { getNeighborCount } from "./getNeighborCount";

export const gameTick = (prev: Cell[]): Cell[] => {
  const next: Cell[] = [];
  // Map over each cell in the grid and return a new cell with the updated isAlive value
  for (const cell of prev) {
    const neighborCount = getNeighborCount(cell, prev);

    // If cell is alive and has less 2 or 3 neighbors, it stays alive
    if (cell.isAlive && (neighborCount === 3 || neighborCount === 2)) {
      next.push({ ...cell, isAlive: true });
    }

    const neighbors = generateNeighborCells(cell, prev);

    next.push(...neighbors);
  }

  return (
    next
      // Remove dead cells
      .filter((cell) => cell.isAlive)
      // Remove duplicates
      .filter(
        (cell, index) =>
          index ===
          next.findIndex(
            (obj) => obj.row === cell.row && obj.column === cell.column
          )
      )
  );
};
