import { useState } from "react";

import Button from "@components/Utils/Button";

// TODO: This type must be imported to here
// TODO: DELETE THIS LATER
interface Task {
  id: number;
  taskLabel: string;
  isDone: boolean;
}

export default function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <input type="checkbox" id={`${task.id}`} checked={task.isDone} />
      <Task
        taskLabel={task.taskLabel}
        isEditing={isEditing}
        taskId={task.id.toString()}
      />
      <TaskItemButtons isEditing={isEditing} setIsEditing={setIsEditing} />
    </div>
  );
}

interface TaskProps {
  taskLabel: string;
  isEditing: boolean;
  taskId: string;
}

function Task({ taskLabel, isEditing, taskId }: TaskProps) {
  const [taskInput, setTaskInput] = useState(taskLabel);

  if (isEditing) {
    return <label htmlFor={taskId}>{taskLabel}</label>;
  } else {
    return (
      <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
    );
  }
}

interface TaskItemButtonsProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskItemButtons({ isEditing, setIsEditing }: TaskItemButtonsProps) {
  if (isEditing) {
    return (
      <div>
        <Button>Save</Button>
        <Button onClick={() => setIsEditing(false)}>Undo</Button>
        <Button>Delete</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button>Delete</Button>
      </div>
    );
  }
}
