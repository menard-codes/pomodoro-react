import { useId } from "react";
import "./Toggle.styles.scss";

interface ToggleProps {
  toggleLabel: string;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle({ toggleLabel, onToggle }: ToggleProps) {
  const id = useId();

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onChange={(e) => onToggle(e)}
      />
      <label htmlFor={id}>{toggleLabel}</label>
    </div>
  );
}
