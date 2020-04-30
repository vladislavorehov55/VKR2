import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {hideAlert} from "../redux/actions";
import styles from './alert.module.css';
export const Alert = () => {
    const closeHandler = () => {
        dispatch(hideAlert())
    };
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    return(
        <div className={`${styles.alert} ${styles[`alert_${alert.type}`]}`}>
            <strong>Внимание!</strong>
            <span>{alert.alertText}</span>
            <span className={styles.btn_close}
                  onClick={closeHandler}>&times;</span>
        </div>
    )
};


