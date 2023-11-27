import { useReducer, useEffect } from "react";

// Components
import Settings from "./Settings";
import PomodoroClock from "./PomodoroClock";
import Tasks from "./Tasks";

// Global State and Reducer
import { defaultState, PomodoroGlobalState } from "./store";
import { pomodoroReducer } from "./reducer";

// Contexts
import {
  PomodoroStateContext,
  PomodoroDispatchContext,
} from "./contexts/globalStateContexts";

export default function PomodoroApp() {
  let initialState: PomodoroGlobalState;

  if (localStorage.getItem("pomodoroState")) {
    initialState = JSON.parse(
      localStorage.getItem("pomodoroState") as string
    ) as PomodoroGlobalState;
  } else {
    initialState = defaultState;
  }

  const [pomodoroState, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem("pomodoroState", JSON.stringify(pomodoroState));
  }, [pomodoroState]);

  return (
    <PomodoroStateContext.Provider value={pomodoroState}>
      <PomodoroDispatchContext.Provider value={pomodoroDispatch}>
        <div>
          <h1>Pomodoro</h1>
          <Settings />
          <PomodoroClock />
          <Tasks />
        </div>
      </PomodoroDispatchContext.Provider>
    </PomodoroStateContext.Provider>
  );
}
