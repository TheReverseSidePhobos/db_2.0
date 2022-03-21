import { taskReducer } from "./taskReducer";
import {combineReducers} from 'redux';
import {auth_reducer} from "./authReducer";

export const rootReducer = combineReducers({
    task: taskReducer,
    auth: auth_reducer
})

export type RootState = ReturnType<typeof rootReducer>