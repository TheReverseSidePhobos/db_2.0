import {TaskActionTypes, TaskAction, taskState} from '../types/task';

const initialState : taskState = {
    modalShow: false,
    tasks: [],
    loading: false,
    error: ''
}

export const taskReducer = (state = initialState, action : TaskAction) : taskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return{
                loading: true,
                tasks: [],
                error: null
            }
        case TaskActionTypes.FETCH_TASKS_SUCCESS:
            return{
                loading: false,
                tasks: action.payload,
                error: null
            }
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return{
                loading: false,
                error: action.payload,
                tasks: []
            }
        default:
            return state;
    }
}