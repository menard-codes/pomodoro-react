import { useId } from "react";
import "./Toggle.styles.scss";

interface ToggleProps {
  toggleLabel: string;
  isToggled: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle({
  toggleLabel,
  isToggled,
  onToggle,
}: ToggleProps) {
  const id = useId();

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onChange={(e) => onToggle(e)}
        checked={isToggled}
      />
      <label htmlFor={id}>{toggleLabel}</label>
    </div>
  );
}
