import {AuthAction, authState, AuthActionTypes} from '../types/auth';


export const initialState: authState = {
    user: null,
    isAuth: true,
    loading: false,
}


export const auth_reducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH:
            debugger
            return {
                ...state,
                isAuth: action.payload
            };
    
            default:
                return state;
    }
}