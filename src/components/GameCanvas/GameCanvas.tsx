import { useEffect, useRef } from "react";

import type { Cell } from "../../types/Cell";
import { CELL_SIZE } from "../../utils/constants";
import { drawCells, drawGrid } from "../../utils/draw-utils";
import style from "./GameCanvas.module.css";

type GameCanvasProps = {
  onClick: (x: number, y: number) => void;
  liveCells: Cell[];
};

export function GameCanvas({
  onClick,
  liveCells,
}: GameCanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  const handleCanvasClick: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) {
      return;
    }

    const xPos = event.clientX;
    const yPos = event.clientY;

    const clickedCell = {
      x: Math.floor(xPos / CELL_SIZE),
      y: Math.floor(yPos / CELL_SIZE),
    };

    onClick(clickedCell.x, clickedCell.y);
  };

  //   Save the  context in ref so we can use it in the draw function
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      contextRef.current = context;
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let context = contextRef.current;

    if (!context || !canvas) {
      return;
    }

    const scale = window.devicePixelRatio;
    context.scale(scale, scale);
    // Make the canvas fill the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set canvas line width to 1px
    context.lineWidth = 1;

    context = drawGrid(context, canvas.width, canvas.height);
    context = drawCells(context, liveCells);

    // Draw to the canvas
    context.stroke();
  }, [canvasRef, liveCells]);

  return (
    <canvas
      className={style.canvas}
      ref={canvasRef}
      aria-label="Game Canvas"
      onClick={handleCanvasClick}
    />
  );
}
