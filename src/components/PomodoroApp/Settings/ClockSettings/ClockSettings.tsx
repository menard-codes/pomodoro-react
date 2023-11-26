import { useState } from "react";

import ClockInput from "./ClockInput";
import Button from "@components/Utils/Button";

import "./ClockSettings.styles.scss";

export default function ClockSettings() {
  // TODO: All these state default input values
  // TODO: must come from the global state context
  const [pomodoroInput, setPomodoroInput] = useState(25);
  const [shortBreakInput, setShortBreakInput] = useState(5);
  const [longBreakInput, setLongBreakInput] = useState(15);

  return (
    <div className="clock-params-container">
      <div className="clock-inputs-container">
        <ClockInput
          label="Pomodoro"
          value={pomodoroInput}
          setValue={setPomodoroInput}
        />
        <ClockInput
          label="Short Break"
          value={shortBreakInput}
          setValue={setShortBreakInput}
        />
        <ClockInput
          label="Long Break"
          value={longBreakInput}
          setValue={setLongBreakInput}
        />
      </div>
      <Button
        // TODO: `Save` must be a dispatch
        onClick={() => alert("saved")}
        className="save-btn"
      >
        Save
      </Button>
    </div>
  );
}
