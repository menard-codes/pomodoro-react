import useTimer from "./timerHooks";

export default function Timer() {
  const { time, handlePausePlay, handleReset, timerStatus } = useTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={handlePausePlay}>
        {timerStatus === "play" ? "Pause" : "Play"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
