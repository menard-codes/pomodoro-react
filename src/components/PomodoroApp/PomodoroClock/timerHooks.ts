import { useState, useEffect, useRef } from "react";

import {
  usePomodoroState,
  usePomodoroDispatch,
} from "@components/PomodoroApp/contexts/globalStateContexts";

// assets/audio
import pomodoroTone from "@assets/audio/PomodoroTime.mp3";
import shortTimeBreakTone from "@assets/audio/ShortTimeBreak.mp3";
import longTimeBreakTone from "@assets/audio/LongTimeBreak.mp3";

export default function useTimer() {
  const { timerStatus, pomodoroStatus, numOfPomodoroCycles, settings, tasks } =
    usePomodoroState();
  const pomodoroDispatch = usePomodoroDispatch();

  const getTimeInSeconds = () => {
    switch (pomodoroStatus) {
      case "short break":
        return settings.clockSettings.shortBreakTime * 60;

      case "long break":
        return settings.clockSettings.longBreakTime * 60;

      case "pomodoro":
      default:
        return settings.clockSettings.pomodoroTime * 60;
    }
  };

  const [time, setTime] = useState(getTimeInSeconds());

  useEffect(() => {
    setTime(getTimeInSeconds());
  }, [pomodoroStatus]);

  useEffect(() => {
    handleReset();
  }, [settings]);

  useEffect(() => {
    if (!settings.shouldAutoSwitchTasks) {
      handleReset();
    }

    const availableTasks = tasks.filter((task) => !task.isDone);
    if (availableTasks.length === 0) {
      handleReset();
    }
  }, [tasks]);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerStatus === "play" && time > 0) {
      timerInterval.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      let nextPomodoroStatus: "pomodoro" | "short break" | "long break";
      const tone = new Audio();

      switch (pomodoroStatus) {
        case "short break":
        case "long break":
          nextPomodoroStatus = "pomodoro";
          tone.src = pomodoroTone;
          break;
        default:
        case "pomodoro":
          if (numOfPomodoroCycles < 4) {
            nextPomodoroStatus = "short break";
            tone.src = shortTimeBreakTone;
          } else {
            nextPomodoroStatus = "long break";
            tone.src = longTimeBreakTone;
          }
      }

      pomodoroDispatch({
        type: "CHANGE_POMODORO_STATUS",
        pomodoroStatus: nextPomodoroStatus,
        numOfPomodoroCycles:
          numOfPomodoroCycles < 4 ? numOfPomodoroCycles + 1 : 0,
      });

      tone.play();
    }

    return () => clearInterval(timerInterval.current as NodeJS.Timeout);
  }, [time, timerStatus]);

  const handlePausePlay = () => {
    if (tasks.length === 0) {
      return;
    }

    pomodoroDispatch({
      type: "SET_TIMER_STATUS",
      timerStatus: timerStatus === "pause" ? "play" : "pause",
    });
  };

  const handleReset = () => {
    pomodoroDispatch({
      type: "SET_TIMER_STATUS",
      timerStatus: "pause",
    });
    pomodoroDispatch({
      type: "CHANGE_POMODORO_STATUS",
      pomodoroStatus: "pomodoro",
      numOfPomodoroCycles: 0,
    });
    setTime(getTimeInSeconds());
  };

  return { time, timerStatus, handlePausePlay, handleReset };
}
