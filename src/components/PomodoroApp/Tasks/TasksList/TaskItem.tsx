import { useState } from "react";

import Button from "@components/Utils/Button";

import { TaskItem } from "@components/PomodoroApp/store";

import { usePomodoroDispatch } from "@components/PomodoroApp/contexts/globalStateContexts";

interface TaskProps {
  task: TaskItem;
}

export default function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskInput, setTaskInput] = useState(task.taskLabel);

  const pomodoroDispatch = usePomodoroDispatch();

  const handleCheckTask = () => {
    const updatedTask: TaskItem = {
      id: task.id,
      taskLabel: task.taskLabel,
      isDone: !task.isDone,
    };
    pomodoroDispatch({
      type: "EDIT_TASK_ITEM",
      updatedTask,
    });
  };

  const handleSaveEdit = () => {
    if (taskInput.length === 0) {
      return;
    }

    const updatedTask: TaskItem = {
      id: task.id,
      taskLabel: taskInput,
      isDone: task.isDone,
    };

    pomodoroDispatch({
      type: "EDIT_TASK_ITEM",
      updatedTask,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    pomodoroDispatch({
      type: "DELETE_TASK_ITEM",
      taskId: task.id,
    });
  };

  return (
    <div>
      <input
        type="checkbox"
        id={`${task.id}`}
        checked={task.isDone}
        onChange={handleCheckTask}
      />
      <TaskDisplay
        taskLabel={task.taskLabel}
        isEditing={isEditing}
        taskId={task.id.toString()}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
      />
      <TaskItemButtons
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        taskLabel={task.taskLabel}
        setTaskInput={setTaskInput}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

interface TaskDisplayProps {
  taskLabel: string;
  isEditing: boolean;
  taskId: string;
  taskInput: string;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
}

function TaskDisplay({
  taskLabel,
  isEditing,
  taskId,
  taskInput,
  setTaskInput,
}: TaskDisplayProps) {
  if (isEditing) {
    return (
      <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
    );
  } else {
    return <label htmlFor={taskId}>{taskLabel}</label>;
  }
}

interface TaskItemButtonsProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  taskLabel: string;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
  handleSaveEdit: () => void;
  handleDelete: () => void;
}

function TaskItemButtons({
  isEditing,
  setIsEditing,
  taskLabel,
  setTaskInput,
  handleSaveEdit,
  handleDelete,
}: TaskItemButtonsProps) {
  const handleUndo = () => {
    setIsEditing(false);
    setTaskInput(taskLabel);
  };

  if (isEditing) {
    return (
      <div>
        <Button onClick={handleSaveEdit}>Save</Button>
        <Button onClick={handleUndo}>Undo</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    );
  }
}
