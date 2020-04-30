import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {alertReducer} from "./alertReducer";
import {navigationReducer} from "./navigationReducer";
import {usersReducer} from "./usersReducer";
import {btnReducer} from "./btnReducer";
import {objectReducer} from "./objectReducer";
import {filtrReducer} from "./filtrReducer";
import {dealReducer} from "./dealReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    nav: navigationReducer,
    users: usersReducer,
    btns: btnReducer,
    objects: objectReducer,
    filtr: filtrReducer,
    deal: dealReducer
});