import { TaskActionTypes, TaskAction, taskState } from '../types/task';

const initialState: taskState = {
  alertShow: false,
  modalShow: false,
  infoModalShow: false,
  infoObj: null,
  tasks: [],
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
    case TaskActionTypes.FETCH_TASKS:
      return {
        loading: true,
        tasks: [],
        error: null
      };
    case TaskActionTypes.FETCH_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload,
        error: null
      };
    case TaskActionTypes.FETCH_TASKS_ERROR:
      return {
        loading: false,
        error: action.payload,
        tasks: []
      };
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
    case TaskActionTypes.UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload
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
        tasks: [...state.tasks, action.payload]
      };
    case TaskActionTypes.SAVE_TASKS_REDUX_TO_REDUX:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    default:
      return state;
  }
};
