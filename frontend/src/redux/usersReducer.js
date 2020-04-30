import {DELETE_USER, GET_USERS} from "./types";

const initialState = {users: []};
export const usersReducer = (state = initialState, action) => {
    if(action.type === GET_USERS){
        return { users: action.payload}
    }
    if(action.type === DELETE_USER){
        return {users: state.users.filter(user => user.id === action.payload.id)}
    }
    return state
};