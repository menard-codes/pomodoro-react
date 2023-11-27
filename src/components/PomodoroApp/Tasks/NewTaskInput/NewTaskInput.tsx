import { useState } from "react";
import Button from "@components/Utils/Button";

import { usePomodoroDispatch } from "@components/PomodoroApp/contexts/globalStateContexts";

import "./NewTaskInput.styles.scss";

interface NewTaskInput extends EventTarget {
  newTask: HTMLInputElement;
}

export default function NewTaskInput() {
  const [inputValue, setInputValue] = useState("");

  const pomodoroDispatch = usePomodoroDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) {
      return;
    }

    pomodoroDispatch({
      type: "ADD_TASK_ITEM",
      task: inputValue,
    });
    setInputValue("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="new-task-form">
      <input
        type="text"
        placeholder="Enter new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="new-task-input"
      />
      <Button type="submit" disabled={inputValue.length === 0}>
        Add
      </Button>
    </form>
  );
}
