import TaskItem from "./TaskItem";

export default function TasksList() {
  // TODO: This must be derived from the global state
  // TODO: CHANGE THIS LATER
  const tasks = [
    {
      id: 0,
      taskLabel: "lorem task",
      isDone: false,
    },
    {
      id: 1,
      taskLabel: "ipsum task",
      isDone: true,
    },
  ];

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </div>
  );
}
