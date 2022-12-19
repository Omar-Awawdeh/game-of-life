import type { Cell } from "../types/Cell";
import { CANVAS_BG_COLOR, CANVAS_GRID_COLOR, CELL_SIZE } from "./constants";

export const drawCells = (
  context: CanvasRenderingContext2D,
  cells: Cell[],
  offset: { x: number; y: number }
): CanvasRenderingContext2D => {
  cells.forEach((cell) => {
    // Set the color of the cell
    context.fillStyle = cell.isAlive ? "yellow" : CANVAS_BG_COLOR;

    // Draw the cell accounting for the grid lines
    context.fillRect(
      cell.row * CELL_SIZE + 1 + offset.x,
      cell.column * CELL_SIZE + 1 + offset.y,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
  });

  return context;
};

export const drawGrid = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: { x: number; y: number }
): CanvasRenderingContext2D => {
  // Fill the canvas with gray background
  context.fillStyle = CANVAS_BG_COLOR;
  context.fillRect(0, 0, width, height);

  // Change the color of the lines to lighter gray
  context.strokeStyle = CANVAS_GRID_COLOR;

  //  Get the number of horizontal and vertical lines
  const xCellCount = height / CELL_SIZE;
  const yCellCount = width / CELL_SIZE;

  for (let i = 0; i < xCellCount; i++) {
    const horizontalOffset = offset.y % CELL_SIZE;
    const horizontalLinePosition = i * CELL_SIZE + horizontalOffset;

    // Draw horizontal lines
    context.moveTo(0, horizontalLinePosition);
    context.lineTo(width, horizontalLinePosition);

    for (let j = 0; j < yCellCount; j++) {
      const verticalOffset = offset.x % CELL_SIZE;
      const verticalLinePosition = j * CELL_SIZE + verticalOffset;

      // Draw vertical lines
      context.moveTo(verticalLinePosition, 0);
      context.lineTo(verticalLinePosition, height);
    }
  }

  return context;
};

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void => {
  canvas.width = width;
  canvas.height = height;
};
