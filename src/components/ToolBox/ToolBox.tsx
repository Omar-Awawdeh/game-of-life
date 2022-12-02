import type { Options } from "../../types/Options";
import styles from "./ToolBox.module.css";

type ToolBoxProps = {
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  options: Options;
  onReset: () => void;
};

export function ToolBox({
  setOptions,
  options,
  onReset,
}: ToolBoxProps): JSX.Element {
  const handleSpeedChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setOptions((prev) => ({
      ...prev,
      speed: Number(event.target.value),
    }));
  };

  const handleIsRunningChange = () => {
    setOptions((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  return (
    <aside className={styles.container}>
      <label htmlFor="speed">Speed</label>
      <input
        id="speed"
        type="range"
        min="1"
        max="5"
        aria-label="speed"
        value={options.speed}
        onChange={handleSpeedChange}
      />
      <button type="button" onClick={handleIsRunningChange}>
        {options.isRunning ? "Stop" : "Start"}
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </aside>
  );
}
