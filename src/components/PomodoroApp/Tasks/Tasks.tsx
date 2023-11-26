import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";

export default function Tasks() {
  return (
    <div>
      <h2>Tasks</h2>
      <NewTaskInput />
      <TasksList />
    </div>
  );
}
