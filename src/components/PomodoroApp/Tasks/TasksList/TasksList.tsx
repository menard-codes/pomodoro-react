import Task from "./TaskItem";

import { usePomodoroState } from "@components/PomodoroApp/contexts/globalStateContexts";

export default function TasksList() {
  const { tasks } = usePomodoroState();

  return (
    <div>
      {tasks.map((task) => (
        <Task key={crypto.randomUUID()} task={task} />
      ))}
    </div>
  );
}
