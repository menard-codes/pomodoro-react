import { useState } from "react";
import Button from "@components/Utils/Button";

import { usePomodoroDispatch } from "@components/PomodoroApp/contexts/globalStateContexts";

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
