import { PomodoroGlobalState, TaskItem } from "./store";

interface ChangePomodoroStatus {
  type: "CHANGE_POMODORO_STATUS";
  pomodoroStatus: "pomodoro" | "short break" | "long break";
  numOfPomodoroCycles: number;
}

interface SetTimerStatus {
  type: "SET_TIMER_STATUS";
  timerStatus: "play" | "pause";
}

interface ChangeClockParams {
  type: "CHANGE_CLOCK_PARAMETERS";
  clockSettings: {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
}

interface SetTaskSwitching {
  type: "SET_TASK_SWITCHING";
  shouldSwitchTask: boolean;
}

interface AddTaskItem {
  type: "ADD_TASK_ITEM";
  task: string;
}

interface EditTaskItem {
  type: "EDIT_TASK_ITEM";
  updatedTask: TaskItem;
}

interface DeleteTaskItem {
  type: "DELETE_TASK_ITEM";
  taskId: number;
}

export type PomodoroStateActions =
  | ChangePomodoroStatus
  | ChangeClockParams
  | SetTimerStatus
  | ChangeClockParams
  | SetTaskSwitching
  | AddTaskItem
  | EditTaskItem
  | DeleteTaskItem;

if (localStorage.getItem("nextId")) {
  localStorage.setItem("nextId", "0");
}

// TODO: Set this to localStorage
export function pomodoroReducer(
  state: PomodoroGlobalState,
  action: PomodoroStateActions
): PomodoroGlobalState {
  switch (action.type) {
    case "CHANGE_POMODORO_STATUS": {
      return {
        ...state,
        pomodoroStatus: action.pomodoroStatus,
        numOfPomodoroCycles: action.numOfPomodoroCycles,
      };
    }
    case "SET_TIMER_STATUS": {
      return {
        ...state,
        timerStatus: action.timerStatus,
      };
    }
    case "CHANGE_CLOCK_PARAMETERS": {
      return {
        ...state,
        settings: {
          ...state.settings,
          clockSettings: action.clockSettings,
        },
      };
    }
    case "SET_TASK_SWITCHING": {
      return {
        ...state,
        settings: {
          ...state.settings,
          shouldAutoSwitchTasks: action.shouldSwitchTask,
        },
      };
    }
    case "ADD_TASK_ITEM": {
      const nextId = localStorage.getItem("nextId");
      const newTask: TaskItem = {
        id: Number(nextId),
        taskLabel: action.task,
        isDone: false,
      };
      localStorage.setItem("nextId", `${Number(nextId) + 1}`);
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }
    case "EDIT_TASK_ITEM": {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== action.updatedTask.id) {
          return task;
        }

        return action.updatedTask;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "DELETE_TASK_ITEM": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.taskId
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _impossible: never = action;
      throw new Error(`Unknown action. ${_impossible}`);
    }
  }
}
