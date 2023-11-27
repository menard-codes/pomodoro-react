import useTimer from "./timerHooks";

// scss
import "./Timer.styles.scss";

export default function Timer() {
  const { time, handlePausePlay, handleReset, timerStatus, tasks } = useTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const noAvailableTasks =
    tasks.every((task) => task.isDone) || tasks.length === 0;

  return (
    <div>
      <time className="time-display">{formatTime(time)}</time>
      <div className="btns-container">
        <button onClick={handlePausePlay} disabled={noAvailableTasks}>
          {timerStatus === "play" ? "Pause" : "Play"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
