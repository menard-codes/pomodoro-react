import Task from "./TaskItem";

import { usePomodoroState } from "@components/PomodoroApp/contexts/globalStateContexts";

export default function TasksList() {
  const { tasks } = usePomodoroState();

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={`${task.id}:${Math.floor(Math.random() * 100000)}`}
          task={task}
        />
      ))}
    </div>
  );
}
