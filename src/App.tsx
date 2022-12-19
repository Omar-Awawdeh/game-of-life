import { useEffect, useRef, useState } from "react";

import "./App.css";
import { GameCanvas } from "./components/GameCanvas/GameCanvas";
import { ToolBox } from "./components/ToolBox/ToolBox";
import type { Cell } from "./types/Cell";
import type { Options } from "./types/Options";
import { createCell } from "./utils/createCell";
import { gameTick } from "./utils/gameTick";

const getGameSpeed = (selectedSpeed: number) => {
  switch (selectedSpeed) {
    case 1: {
      return 1000;
    }
    case 2: {
      return 750;
    }
    case 3: {
      return 500;
    }
    case 4: {
      return 250;
    }
    case 5: {
      return 100;
    }
    default: {
      return 500;
    }
  }
};

export function App(): JSX.Element {
  const [liveCells, setLiveCells] = useState<Cell[]>([]);
  const [options, setOptions] = useState<Options>({
    isRunning: false,
    speed: 3,
  });

  const interval = useRef<number>();

  const handleCellClick = (x: number, y: number) => {
    const yPos = y;
    const xPos = x;

    const clickedCellIndex = liveCells.findIndex(
      (cell) => cell.row === xPos && cell.column === yPos
    );

    // If cell doesn't exist add it to the live cells
    if (clickedCellIndex < 0) {
      setLiveCells((prev) => [...prev, createCell(xPos, yPos, true)]);
      return;
    }
    // Otherwise toggle the cell's isAlive value
    setLiveCells((prev) => {
      const newLiveCells = [...prev];
      const oldCell = newLiveCells[clickedCellIndex];
      const newCell = { ...oldCell, isAlive: !oldCell.isAlive };
      // Replace old cell with new cell
      newLiveCells.splice(clickedCellIndex, 1, newCell);

      return newLiveCells;
    });
  };

  const handleReset = () => {
    setLiveCells([]);
  };

  const runGame = () => {
    setLiveCells(gameTick);
  };

  useEffect(() => {
    if (!options.isRunning) {
      clearInterval(interval.current);
      return;
    }

    const gameSpeed = getGameSpeed(options.speed);

    // Make sure to clear interval before setting a new one
    clearInterval(interval.current);
    // Set interval to run game at a set speed
    interval.current = setInterval(runGame, gameSpeed);

    return () => {
      clearInterval(interval.current);
    };
  }, [options.isRunning, options.speed]);

  return (
    <div className="App">
      <GameCanvas onClick={handleCellClick} liveCells={liveCells} />
      <ToolBox
        options={options}
        setOptions={setOptions}
        onReset={handleReset}
      />
    </div>
  );
}
