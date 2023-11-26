import { useState } from "react";
import Button from "@components/Utils/Button";

interface NewTaskInput extends EventTarget {
  newTask: HTMLInputElement;
}

export default function NewTaskInput() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) {
      return;
    }

    // TODO: Add the new task via dispatch
    alert("added new task");
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
