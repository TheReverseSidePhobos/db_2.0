export interface taskState {
  modalShow?: boolean;
  tasks: any[];
  loading: boolean;
  error: null | string;
  id?: number;
  name?: string;
  description?: string;
  priority?: string;
  dateFinish?: null | Date;
  dateWasMade?: null | Date;
}

export enum TaskActionTypes {
  FETCH_TASKS = 'FETCH_TASKS',
  FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
  SET_AUTH = 'SET_AUTH',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  SAVE_TASK = 'SAVE_TASK',
  SAVE_DATE_WAS_MADE = 'SAVE_DATE_WAS_MADE',
  SAVE_DATE_FINIHED = 'SAVE_DATE_FINIHED'
}

interface FetchTaskAction {
  type: TaskActionTypes.FETCH_TASKS;
}
interface FetchTaskSuccessAction {
  type: TaskActionTypes.FETCH_TASKS_SUCCESS;
  payload: any[];
}
interface FetchTaskErrorAction {
  type: TaskActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}
interface setAuth {
  type: TaskActionTypes.SET_AUTH;
  payload: boolean;
}
interface toggleModal {
  type: TaskActionTypes.TOGGLE_MODAL;
}
interface saveTask {
  type: TaskActionTypes.SAVE_TASK;
  payload: object
}
interface saveDateWasMade {
  type: TaskActionTypes.SAVE_DATE_WAS_MADE;
  payload: Date
}
interface saveDateFinished {
  type: TaskActionTypes.SAVE_DATE_FINIHED;
  payload: Date
}

export type TaskAction =
  | FetchTaskAction
  | FetchTaskSuccessAction
  | FetchTaskErrorAction
  | setAuth
  | toggleModal
  | saveTask
  | saveDateWasMade
  | saveDateFinished;
