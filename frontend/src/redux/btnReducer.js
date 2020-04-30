import {ACTIVE_BTN, INACTIVE_BTN} from "./types";
const initialState = {filtrDisable: false, cancelDisable: true};
export const btnReducer = (state = initialState, action) => {
    if(ACTIVE_BTN){
        return {...state, [action.payload]: false}
    }
    if(INACTIVE_BTN){
        return {...state, [action.payload]: true}
    }
    return state
};