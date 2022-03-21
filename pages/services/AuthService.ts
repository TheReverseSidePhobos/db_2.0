
import $api from "../http";

export async function loginSer(email: string, password: string){
    return $api.post('/login', {email, password});
}
export async function registrationSer(email: string, password: string){
    return $api.post('/registration', {email, password});
}
export async function logoutSer(){
    return $api.post('/logout');
}