import { useState, useId } from "react";

import Button from "@components/Utils/Button";

import { TaskItem } from "@components/PomodoroApp/store";

import {
  usePomodoroState,
  usePomodoroDispatch,
} from "@components/PomodoroApp/contexts/globalStateContexts";

import "./TaskItem.styles.scss";

interface TaskProps {
  task: TaskItem;
}

export default function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskInput, setTaskInput] = useState(task.taskLabel);

  const customTaskId = useId();

  const { tasks } = usePomodoroState();
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
    <div className="task-item">
      <input
        type="checkbox"
        id={customTaskId}
        checked={task.isDone}
        onChange={handleCheckTask}
      />
      <div>
        <TaskDisplay
          taskLabel={task.taskLabel}
          isEditing={isEditing}
          taskId={customTaskId}
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
        <div className="reorder-btns">
          <Button
            onClick={() =>
              pomodoroDispatch({
                type: "MOVE_TASK_ITEM",
                taskIndex: tasks.findIndex(
                  (taskItem) => taskItem.id === task.id
                ),
                to: "up",
              })
            }
          >
            ⬆️
          </Button>
          <Button
            onClick={() =>
              pomodoroDispatch({
                type: "MOVE_TASK_ITEM",
                taskIndex: tasks.findIndex(
                  (taskItem) => taskItem.id === task.id
                ),
                to: "down",
              })
            }
          >
            ⬇️
          </Button>
        </div>
      </div>
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
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        autoFocus
      />
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
      <div className="task-item-btns">
        <Button onClick={handleSaveEdit}>Save</Button>
        <Button onClick={handleUndo}>Undo</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    );
  } else {
    return (
      <div className="task-item-btns">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    );
  }
}
