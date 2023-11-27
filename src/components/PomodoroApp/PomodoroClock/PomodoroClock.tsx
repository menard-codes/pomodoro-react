// Components
import Timer from "./Timer";

// Context Hooks
import { usePomodoroState } from "@components/PomodoroApp/contexts/globalStateContexts";

// scss
import "./PomodoroClock.styles.scss";

export default function PomodoroClock() {
  const { pomodoroStatus, tasks } = usePomodoroState();

  const activeTask = tasks.find((task) => !task.isDone);

  return (
    <div className="pomodoro-clock-container">
      <p className="pomodoro-status">{pomodoroStatus}</p>
      <Timer />
      <p className="active-task">
        <strong>Task:</strong> {activeTask?.taskLabel || "No available tasks"}
      </p>
    </div>
  );
}
