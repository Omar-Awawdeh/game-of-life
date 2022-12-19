import type { Cell } from "../types/Cell";
import { createCell } from "./createCell";
import { getNeighborCount } from "./getNeighborCount";

export const generateNeighborCells = (
  currentCell: Cell,
  liveCells: Cell[]
): Cell[] => {
  const newCells = [];

  // Check all 8 neighbors by looping through all possible...
  // ... combinations of [-1, 0, 1] for row and column
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Skip the current cell
      if (i === 0 && j === 0) {
        continue;
      }
      //   Create a new cell at the current position
      const neighbor = createCell(
        currentCell.row + j,
        currentCell.column + i,
        true
      );

      const neighborCount = getNeighborCount(neighbor, liveCells);
      //   if dead cell has 3 live neighbors, it becomes alive
      if (neighborCount === 3) {
        newCells.push(neighbor);
      }
    }
  }

  return newCells;
};
