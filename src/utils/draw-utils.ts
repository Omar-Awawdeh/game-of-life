import type { Cell } from "../types/Cell";
import { CANVAS_BG_COLOR, CANVAS_GRID_COLOR, CELL_SIZE } from "./constants";

export const drawCells = (
  context: CanvasRenderingContext2D,
  cells: Cell[]
): CanvasRenderingContext2D => {
  cells.forEach((cell) => {
    // Set the color of the cell
    context.fillStyle = cell.isAlive ? "yellow" : CANVAS_BG_COLOR;

    // Draw the cell accounting for the grid lines
    context.fillRect(
      cell.column * CELL_SIZE + 1,
      cell.row * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
  });

  return context;
};

export const drawGrid = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): CanvasRenderingContext2D => {
  // Fill the canvas with gray background
  context.fillStyle = CANVAS_BG_COLOR;
  context.fillRect(0, 0, width, height);

  // Change the color of the lines to lighter gray
  context.strokeStyle = CANVAS_GRID_COLOR;

  //  Get the number of horizontal and vertical lines
  const yCellCount = height / CELL_SIZE;
  const xCellCount = width / CELL_SIZE;

  for (let i = 0; i < yCellCount; i++) {
    // Draw horizontal lines
    context.moveTo(0, i * CELL_SIZE);
    context.lineTo(width, i * CELL_SIZE);
    for (let j = 0; j < xCellCount; j++) {
      // Draw vertical lines
      context.moveTo(j * CELL_SIZE, 0);
      context.lineTo(j * CELL_SIZE, height);
    }
  }

  return context;
};
