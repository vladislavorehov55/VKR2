import {SHOW_NAVIGATION, HIDE_NAVIGATION} from "./types";
const initialState = {
    isShowed: null
};
export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case HIDE_NAVIGATION:
            return {
                isShowed: false
            };
        case SHOW_NAVIGATION:
            return {
                isShowed: true
            };
        default: break;
    }
    return state
};