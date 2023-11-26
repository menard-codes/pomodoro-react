import { useState } from "react";

import Button from "@components/Utils/Button";
import Modal from "@components/Utils/Modal/Modal";
import Toggle from "@components/Utils/Toggle";
import ClockSettings from "./ClockSettings";

import "./Settings.styles.scss";

export default function Settings() {
  const [settingsIsShown, setSettingsIsShown] = useState(false);

  return (
    <div>
      {/* TODO: Change this to Icon */}
      <Button onClick={() => setSettingsIsShown(true)}>Settings</Button>
      {settingsIsShown && (
        <Modal exitModal={() => setSettingsIsShown(false)}>
          <h2 className="modal-title">Settings</h2>
          <ClockSettings />
          <Toggle
            toggleLabel="Automatically switch tasks."
            // TODO: Handle toggle state
            onToggle={(e) => console.log(e.target.checked)}
          />
        </Modal>
      )}
    </div>
  );
}
