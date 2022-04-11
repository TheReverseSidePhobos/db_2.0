import { TaskActionTypes, TaskAction, taskState } from '../types/task';

const initialState: taskState = {
  alertShow: false,
  modalShow: false,
  infoModalShow: false,
  infoObj: null,
  newTasks: [],
  inProgressTasks: [],
  doneTasks: [],
  loading: false,
  error: '',
  name: '',
  description: '',
  priority: '',
  dateFinish: new Date(),
  dateWasMade: new Date()
};

export const taskReducer = (
  state = initialState,
  action: TaskAction
): taskState => {
  switch (action.type) {
    // case TaskActionTypes.FETCH_TASKS:
    //   return {
    //     loading: true,
    //     tasks: [],
    //     error: null
    //   };
    // case TaskActionTypes.FETCH_TASKS_SUCCESS:
    //   return {
    //     loading: false,
    //     tasks: action.payload,
    //     error: null
    //   };
    // case TaskActionTypes.FETCH_TASKS_ERROR:
    //   return {
    //     loading: false,
    //     error: action.payload,
    //     tasks: []
    //   };
    case TaskActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modalShow: action.payload
      };
    case TaskActionTypes.TOGGLE_INFO_MODAL:
      return {
        ...state,
        infoModalShow: action.payload
      };
    case TaskActionTypes.SAVE_DATE_WAS_MADE:
      return {
        ...state,
        dateWasMade: action.payload
      };
    case TaskActionTypes.SAVE_DATE_FINIHED:
      return {
        ...state,
        dateFinish: action.payload
      };
    case TaskActionTypes.UPDATE_NEW_TASKS:
      return {
        ...state,
        newTasks: action.payload
      };
    case TaskActionTypes.UPDATE_PROGRESS_TASKS:
      return {
        ...state,
        inProgressTasks: action.payload
      };
    case TaskActionTypes.UPDATE_DONE_TASKS:
      return {
        ...state,
        doneTasks: action.payload
      };
    case TaskActionTypes.SAVE_OBJECT_FOR_INFO:
      return {
        ...state,
        infoObj: action.payload
      };
    case TaskActionTypes.ALERT_SHOW:
      return {
        ...state,
        alertShow: action.payload
      };
    case TaskActionTypes.SAVE_TASK_REDUX:
      return {
        ...state,
        newTasks: [...state.newTasks, action.payload]
      };
    case TaskActionTypes.SAVE_NEW_TASKS_REDUX_FROM_DB:
      return {
        ...state,
        newTasks: [...state.newTasks, action.payload]
      };
    case TaskActionTypes.SAVE_PROGRESS_TASKS_REDUX_FROM_DB:
      return {
        ...state,
        inProgressTasks: [...state.inProgressTasks, action.payload]
      };
    case TaskActionTypes.SAVE_DONE_TASKS_REDUX_FROM_DB:
      return {
        ...state,
        doneTasks: [...state.doneTasks, action.payload]
      };

    default:
      return state;
  }
};
