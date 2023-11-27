// Components
import Timer from "./Timer";

// Context Hooks
import { usePomodoroState } from "@components/PomodoroApp/contexts/globalStateContexts";

export default function PomodoroClock() {
  const { pomodoroStatus, tasks } = usePomodoroState();

  const activeTask = tasks.find((task) => !task.isDone);

  return (
    <div>
      <p>{pomodoroStatus}</p>
      <Timer />
      <p>Next task: {activeTask?.taskLabel}</p>
    </div>
  );
}
