import {LOGIN, LOGOUT} from "./types";

export const authReducer = (state = {jwtToken: null, error: null}, action) => {
    if(action.type === LOGIN){
        return {...state, jwtToken: action.payload.token, error: action.payload.error}
    }
    else if(action.type === LOGOUT){
        return {jwtToken: null, error: null}
    }
    return state
};