import { useState } from "react";

// Components
import ClockInput from "./ClockInput";
import Button from "@components/Utils/Button";

// Context Hooks
import {
  usePomodoroState,
  usePomodoroDispatch,
} from "@components/PomodoroApp/contexts/globalStateContexts";

// SCSS
import "./ClockSettings.styles.scss";

interface ClockSettingsProps {
  setSettingsIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClockSettings({
  setSettingsIsShown,
}: ClockSettingsProps) {
  const {
    settings: { clockSettings },
  } = usePomodoroState();
  const pomodoroDispatch = usePomodoroDispatch();

  const [pomodoroInput, setPomodoroInput] = useState(
    clockSettings.pomodoroTime
  );
  const [shortBreakInput, setShortBreakInput] = useState(
    clockSettings.shortBreakTime
  );
  const [longBreakInput, setLongBreakInput] = useState(
    clockSettings.longBreakTime
  );

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
        onClick={() => {
          pomodoroDispatch({
            type: "CHANGE_CLOCK_PARAMETERS",
            clockSettings: {
              pomodoroTime: pomodoroInput,
              shortBreakTime: shortBreakInput,
              longBreakTime: longBreakInput,
            },
          });
          setSettingsIsShown(false);
        }}
        className="save-btn"
      >
        Save
      </Button>
    </div>
  );
}
