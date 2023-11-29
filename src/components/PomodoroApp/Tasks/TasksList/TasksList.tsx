import Task from "./TaskItem";

import { usePomodoroState } from "@components/PomodoroApp/contexts/globalStateContexts";

export default function TasksList() {
  const { tasks } = usePomodoroState();

  return (
    <div>
      {tasks.map((task) => (
        <Task key={Math.floor(Math.random() * 10_000_000_000)} task={task} />
      ))}
    </div>
  );
}
