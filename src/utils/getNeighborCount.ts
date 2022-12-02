import type { Cell } from "../types/Cell";

export const getNeighborCount = (
  currentPos: { row: number; column: number },
  aliveCells: Cell[]
): number => {
  let neighborCount = 0;
  const { row, column } = currentPos;

  // Check all 8 neighbors by looping through all possible...
  // ... combinations of [-1, 0, 1] for row and column
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Skip the current cell
      if (i === 0 && j === 0) {
        continue;
      }
      const neighborCell = aliveCells.find(
        (cell) => cell.row === row + i && cell.column === column + j
      );
      if (neighborCell?.isAlive) {
        neighborCount++;
      }
    }
  }

  return neighborCount;
};
