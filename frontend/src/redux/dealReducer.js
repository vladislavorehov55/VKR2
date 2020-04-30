import {GET_DEAL} from "./types";
const initialState = {object: null};
export const dealReducer = (state = initialState, action) => {
    if (action.type === GET_DEAL){
        return {object: action.payload}
    }
    return state
};