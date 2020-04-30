import {HIDE_FILTR, SHOW_FILTR} from "./types";

const initialState = {show: null};
export const filtrReducer = (state = initialState, action) => {
    if (action.type === SHOW_FILTR){
        return {show: true}
    }
    if (action.type === HIDE_FILTR){
        return {show: false}
    }
    return state
};
