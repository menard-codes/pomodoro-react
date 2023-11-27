export interface TaskItem {
  id: number;
  taskLabel: string;
  isDone: boolean;
}

export interface PomodoroGlobalState {
  pomodoroStatus: "pomodoro" | "short break" | "long break";
  numOfPomodoroCycles: number;
  timerStatus: "play" | "pause";
  settings: {
    clockSettings: {
      pomodoroTime: number;
      shortBreakTime: number;
      longBreakTime: number;
    };
    shouldAutoSwitchTasks: boolean;
  };
  tasks: TaskItem[];
}

export const defaultState: PomodoroGlobalState = {
  pomodoroStatus: "pomodoro",
  numOfPomodoroCycles: 0,
  timerStatus: "pause",
  settings: {
    clockSettings: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    },
    shouldAutoSwitchTasks: false,
  },
  tasks: [],
};
