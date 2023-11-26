import Settings from "./Settings";
import PomodoroClock from "./PomodoroClock";
import Tasks from "./Tasks";

export default function PomodoroApp() {
  return (
    <div>
      <h1>Pomodoro</h1>
      <Settings />
      <PomodoroClock />
      <Tasks />
    </div>
  );
}
