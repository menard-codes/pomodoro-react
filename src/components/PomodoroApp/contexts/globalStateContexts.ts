import { createContext, useContext } from "react";
import { PomodoroGlobalState } from "../store";
import { PomodoroStateActions } from "../reducer";

export const PomodoroStateContext = createContext<PomodoroGlobalState | null>(
  null
);
export function usePomodoroState() {
  const pomodoroState = useContext(PomodoroStateContext);

  if (!pomodoroState) {
    throw new Error(
      "PomodoroStateContext can only be used within a Context Provider"
    );
  }

  return pomodoroState;
}

export const PomodoroDispatchContext =
  createContext<React.Dispatch<PomodoroStateActions> | null>(null);
export function usePomodoroDispatch() {
  const pomodoroDispatch = useContext(PomodoroDispatchContext);

  if (!pomodoroDispatch) {
    throw new Error(
      "PomodoroDispatchContext can only be used within a Context Provider"
    );
  }

  return pomodoroDispatch;
}
