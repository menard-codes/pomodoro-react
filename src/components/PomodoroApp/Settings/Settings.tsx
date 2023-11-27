import { useState } from "react";

// Components
import Button from "@components/Utils/Button";
import Modal from "@components/Utils/Modal/Modal";
import Toggle from "@components/Utils/Toggle";
import ClockSettings from "./ClockSettings";

// Context Hooks
import {
  usePomodoroState,
  usePomodoroDispatch,
} from "@components/PomodoroApp/contexts/globalStateContexts";

// SCSS
import "./Settings.styles.scss";

export default function Settings() {
  const [settingsIsShown, setSettingsIsShown] = useState(false);

  const { settings } = usePomodoroState();
  const pomodoroDispatch = usePomodoroDispatch();

  return (
    <div>
      {/* TODO: Change this to Icon */}
      <Button onClick={() => setSettingsIsShown(true)}>Settings</Button>
      {settingsIsShown && (
        <Modal exitModal={() => setSettingsIsShown(false)}>
          <h2 className="modal-title">Settings</h2>
          <ClockSettings setSettingsIsShown={setSettingsIsShown} />
          <Toggle
            toggleLabel="Automatically switch tasks."
            isToggled={settings.shouldAutoSwitchTasks}
            onToggle={() =>
              pomodoroDispatch({
                type: "SET_TASK_SWITCHING",
                shouldSwitchTask: !settings.shouldAutoSwitchTasks,
              })
            }
          />
        </Modal>
      )}
    </div>
  );
}
