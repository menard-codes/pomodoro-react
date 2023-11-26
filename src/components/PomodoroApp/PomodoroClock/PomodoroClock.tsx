import Button from "@components/Utils/Button";

export default function PomodoroClock() {
  // TODO: This must be derived from the global state
  // TODO: They must be handled via `useState`
  const minutes = 24;
  const seconds = 39;

  // TODO: Get these later from the global state
  const pomodoroStatus = "Pomodoro";
  const activeTask = "lorem ipsum task";

  return (
    <div>
      <p>{pomodoroStatus}</p>
      <time>
        {minutes} : {seconds}
      </time>
      <p>{activeTask}</p>
      <Button>Play</Button>
      <Button>Reset</Button>
    </div>
  );
}
