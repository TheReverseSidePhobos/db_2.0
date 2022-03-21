import { Dispatch } from "redux"
import { TaskAction, TaskActionTypes } from "../types/task"
import axios from 'axios';
import { logoutSer } from "../../pages/services/AuthService";
import {AuthActionTypes, AuthAction} from '../types/auth';

export  const fetchTasks = () => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskActionTypes.FETCH_TASKS})
            const response = await axios

            .get(` `)
        } catch (e) {
            console.log(e)
        }
    }
}


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
    debugger
    return{
        type: AuthActionTypes.SET_AUTH,
        payload: isAuth
    }
}

export const setUser = (user: any) => {
    debugger
    return {
      type: AuthActionTypes.SET_USER,
      payload: user
    };
  };