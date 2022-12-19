import { useCallback, useEffect, useRef, useState } from "react";

import type { Cell } from "../../types/Cell";
import { CELL_SIZE } from "../../utils/constants";
import { drawCells, drawGrid, resizeCanvas } from "../../utils/draw-utils";
import style from "./GameCanvas.module.css";

type GameCanvasProps = {
  onClick: (x: number, y: number) => void;
  liveCells: Cell[];
};

export function GameCanvas({
  onClick,
  liveCells,
}: GameCanvasProps): JSX.Element {
  const [offset, setOffSet] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    setIsMouseDown(false);
    setIsPanning(false);
    // Click the canvas on mouse up
    handleCanvasClick(event);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsPanning(false);
  };

  const handleCanvasClick: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    // Don't register cell click if canvas is panning
    if (isPanning) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) {
      return;
    }

    // Calculate clicked position
    const xPos = event.clientX - offset.x;
    const yPos = event.clientY - offset.y;

    // get clicked cell coordinates
    const clickedCell = {
      x: Math.floor(xPos / CELL_SIZE),
      y: Math.floor(yPos / CELL_SIZE),
    };

    onClick(clickedCell.x, clickedCell.y);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    if (!isMouseDown) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context || !canvas) {
      return;
    }

    const xMovement = event.movementX;
    const yMovement = event.movementY;

    const mouseMovement = {
      x: Math.floor(xMovement),
      y: Math.floor(yMovement),
    };

    setIsPanning(true);

    setOffSet((prev) => ({
      x: mouseMovement.x + prev.x,
      y: mouseMovement.y + prev.y,
    }));
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    let context = canvas?.getContext("2d");

    if (!context || !canvas) {
      return;
    }

    // Make the canvas fill the entire screen
    resizeCanvas(canvas, window.innerWidth, window.innerHeight);

    context = drawGrid(context, canvas.width, canvas.height, offset);
    context = drawCells(context, liveCells, offset);

    // Draw to the canvas
    context.stroke();
  }, [liveCells, offset]);

  useEffect(() => {
    drawCanvas();
  }, [canvasRef, drawCanvas, liveCells, offset]);

  // Redraw canvas when window size changes
  useEffect(() => {
    window.addEventListener("resize", drawCanvas);
    return () => {
      window.removeEventListener("resize", drawCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      className={isPanning ? style.isPanning : ""}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
      aria-label="Game Canvas"
    />
  );
}
