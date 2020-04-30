import {GET_IMAGE, GET_OBJECT, GET_OBJECTS} from "./types";

const initialState = {objects: [], object: [], buf:[]};
export const objectReducer = (state = initialState, action) => {
    if(action.type === GET_OBJECTS){
        return {...state, objects: action.payload}
    }
    if (action.type === GET_OBJECT){
        return {...state, object: action.payload.object, buf: action.payload.buf}
    }
    if (action.type === GET_IMAGE){
        return {...state, imageSrc: state.buf[action.payload]}
    }
    return state
};