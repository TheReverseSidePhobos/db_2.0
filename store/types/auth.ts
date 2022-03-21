export interface authState {
    user: object | null,
    isAuth: boolean,
    loading: boolean,
}

export enum AuthActionTypes {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
}

interface setAuth {
    type: AuthActionTypes.SET_AUTH;
    payload: boolean;
}
interface setUser {
    type: AuthActionTypes.SET_USER;
    payload: boolean;
}

export type AuthAction = 
 setAuth | 
 setUser;
