import {
    HIDE_ALERT,
    LOGIN,
    LOGOUT,
    SHOW_ALERT,
    SHOW_NAVIGATION,
    HIDE_NAVIGATION,
    GET_USERS,
    DELETE_USER,
    ACTIVE_BTN, INACTIVE_BTN, GET_OBJECTS, GET_OBJECT, GET_IMAGE, SHOW_FILTR, HIDE_FILTR, GET_DEAL
} from "./types";
import {useHttpRequest} from "../userHooks/useHttpRequet";

const {request} = useHttpRequest();
export function login(form, jwtToken = null, error = null) {
    return async (dispatch) => {
            if(jwtToken === null){
                const data = await request('/api/auth/login', 'POST', form,
                    {'Content-Type': 'application/json'});
                if(data.message){
                    return dispatch(showAlert(data.message, 'warning'))
                }

                localStorage.setItem('userData', JSON.stringify({token: data.token, accessLevel: data.accessLevel}));
                dispatch(showNav());
                return dispatch({
                    type: LOGIN,
                    payload: {token: data.token, error}
                })
            }
            return dispatch({
                type: LOGIN,
                payload: {token: jwtToken, error}
            })
    }
}
export function getDeal(object) {
    return {type: GET_DEAL, payload: object}
}
export function logout(){
    localStorage.removeItem('userData');
    return { type: LOGOUT }
}
export function showAlert(text, type) {
    return {
        type: SHOW_ALERT,
        payload: {text, type}
    }
}
export function hideAlert() {
    return { type: HIDE_ALERT }
}
export function showNav() {
    return { type: SHOW_NAVIGATION }
}
export function hideNav() {
    return { type: HIDE_NAVIGATION }
}

export function getUsers(usersArray) {
    return { type: GET_USERS, payload: usersArray }
}
export function deleteUser(id) {
    return {type: DELETE_USER, payload: id}
}
export function activateBtn(btnName) {
    return (dispatch) => {
        dispatch(inactivateBtn('filtrDisable'));
        return {type: ACTIVE_BTN, payload: btnName }
    }
}
export function getObjects(objectsArray){
    return {type: GET_OBJECTS, payload: objectsArray}
}
export function getObject(obj) {
    return {type: GET_OBJECT, payload: {object: obj.object, buf: obj.buf}}
}
export function getImage(ind) {
    return {type: GET_IMAGE, payload: ind}
}
export function showFiltr(){
    return {type: SHOW_FILTR}
}
export function hideFiltr() {
    return {type: HIDE_FILTR}
}
export function inactivateBtn(btnName) {
    return (dispatch) => {
        return {type: INACTIVE_BTN, payload: btnName}
    }
}

