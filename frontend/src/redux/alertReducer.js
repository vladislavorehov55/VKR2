import {SHOW_ALERT, HIDE_ALERT} from "./types";

const initialState = {
    isShowed: false,
    alertText: '',
    type: null
};
export const alertReducer = (state = initialState, action) => {
    if(action.type === SHOW_ALERT ){
        return {...state, isShowed: true, alertText: action.payload.text, type: action.payload.type }
    }
    if(action.type === HIDE_ALERT){
        return {...state, isShowed: false, alertText: '', type: null }
    }
    return state
};
