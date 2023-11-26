import { useId } from "react";

import "./ClockInput.styles.scss";

interface ClockInputProps {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClockInput({
  label,
  value,
  setValue,
}: ClockInputProps) {
  const id = useId();

  return (
    <div className="clock-input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        min={1}
        max={60}
        id={id}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}
