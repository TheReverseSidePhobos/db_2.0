export interface taskState {
    modalShow: boolean;
    tasks: any[];
    loading: boolean;
    error: null | string;
}

export enum TaskActionTypes {
    FETCH_TASKS = 'FETCH_TASKS',
    FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
    SET_AUTH = 'SET_AUTH',
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

export type TaskAction = FetchTaskAction |
 FetchTaskSuccessAction |
 FetchTaskErrorAction |
 setAuth;

