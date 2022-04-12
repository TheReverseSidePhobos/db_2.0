import { Dispatch } from 'redux';
import { TaskAction, TaskActionTypes } from '../types/task';
import axios from 'axios';
import { logoutSer } from '../../pages/services/AuthService';
import { AuthActionTypes, AuthAction } from '../types/auth';

export const fetchTasks = () => {
  return async (dispatch: Dispatch<TaskAction>) => {
    try {
      dispatch({ type: TaskActionTypes.FETCH_TASKS });
      const response = await axios.get(` `);
    } catch (e) {
      console.log(e);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const response = await logoutSer();
      localStorage.removeItem('token');
      dispatch(setAuth(false));
      dispatch(setUser(null));
    } catch (e: any) {
      console.log(e.respose?.data?.message);
    }
  };
};

export const setAuth = (isAuth: boolean) => {
  return {
    type: AuthActionTypes.SET_AUTH,
    payload: isAuth
  };
};

export const setUser = (user: any) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: user
  };
};
export const toggleModal = (bool: any) => {
  return {
    type: TaskActionTypes.TOGGLE_MODAL,
    payload: bool
  };
};
export const toggleInfoModal = (bool: any) => {
  return {
    type: TaskActionTypes.TOGGLE_INFO_MODAL,
    payload: bool
  };
};
export const setStartDate = (dateStarted: Date | null) => {
  return {
    type: TaskActionTypes.SAVE_DATE_WAS_MADE,
    payload: dateStarted
  };
};
export const setFinishDate = (dateFinish: Date) => {
  return {
    type: TaskActionTypes.SAVE_DATE_FINIHED,
    payload: dateFinish
  };
};
export const saveTask = (task: Date) => {
  return {
    type: TaskActionTypes.SAVE_TASK,
    payload: task
  };
};
export const updNewTasks = (tasks: any) => {
  return {
    type: TaskActionTypes.UPDATE_NEW_TASKS,
    payload: tasks
  };
};
export const updProgressTasks = (tasks: any) => {
  return {
    type: TaskActionTypes.UPDATE_PROGRESS_TASKS,
    payload: tasks
  };
};
export const updDoneTasks = (tasks: any) => {
  return {
    type: TaskActionTypes.UPDATE_DONE_TASKS,
    payload: tasks
  };
};

// export const fetchTasks = () => {
//   return async (dispatch: Dispatch<TaskAction>) => {
//     try {
//       dispatch({ type: TaskActionTypes.FETCH_TASKS });
//       const response = await axios.get(` `);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

export const updateTasks = (tasks: any, position?: any) => {
  debugger;

  if (!!position) {
    return async (dispatch: Dispatch) => {
      try {
        if (position === 'New Tasks') {
          dispatch({ type: TaskActionTypes.UPDATE_NEW_TASKS, payload: tasks });
        }
        if (position === 'In Progress') {
          dispatch({
            type: TaskActionTypes.UPDATE_PROGRESS_TASKS,
            payload: tasks
          });
        }
        if (position === 'Done') {
          dispatch({ type: TaskActionTypes.UPDATE_DONE_TASKS, payload: tasks });
        }
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    let news = tasks.filter((task: any) => task.position == 'new');
    let progress = tasks.filter((task: any) => task.position == 'progress');
    let dones = tasks.filter((task: any) => task.position == 'done');
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: TaskActionTypes.UPDATE_NEW_TASKS, payload: news });
        dispatch({
          type: TaskActionTypes.UPDATE_PROGRESS_TASKS,
          payload: progress
        });
        dispatch({ type: TaskActionTypes.UPDATE_DONE_TASKS, payload: dones });
      } catch (error) {
        console.log(error);
      }
    };
  }
};

export const add_to_redux_from_db = (task: any) => {
  //если это одна таска
  if (task.position === 'new') {
    return {
      type: TaskActionTypes.SAVE_NEW_TASKS_REDUX_FROM_DB,
      payload: task
    };
  } else if (task.position === 'progress') {
    return {
      type: TaskActionTypes.SAVE_PROGRESS_TASKS_REDUX_FROM_DB,
      payload: task
    };
  } else {
    //done
    return {
      type: TaskActionTypes.SAVE_DONE_TASKS_REDUX_FROM_DB,
      payload: task
    };
  }
  // let new_tasks = tasks.filter((task) => task.position == 'new');
  // let progress_tasks = tasks.filter((task) => task.position == 'progress');
  // let done_tasks = tasks.filter((task) => task.position == 'done');
};

export const add_task_to_redux = (task: any) => {
  return {
    type: TaskActionTypes.SAVE_TASK_REDUX,
    payload: task
  };
};

export const saveObjForInfo = (infoObj: {}) => {
  return {
    type: TaskActionTypes.SAVE_OBJECT_FOR_INFO,
    payload: infoObj
  };
};
export const alertShow = (bool: boolean) => {
  return {
    type: TaskActionTypes.ALERT_SHOW,
    payload: bool
  };
};
