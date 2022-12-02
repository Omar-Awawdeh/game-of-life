import type { Cell } from "../../types/Cell";
import styles from "./Cell.module.css";

type CellProps = {
  cell: Cell;
  onClick: (cell: Cell) => void;
};

export function CellComponent({ cell, onClick }: CellProps): JSX.Element {
  const handleCellClick = () => {
    onClick(cell);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={handleCellClick}
      className={`${styles.cell} ${cell.isAlive ? styles.alive : styles.dead}`}
    />
  );
}
