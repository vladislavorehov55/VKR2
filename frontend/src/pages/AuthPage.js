import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {hideAlert, login} from "../redux/actions";
import {useHttpRequest} from "../userHooks/useHttpRequet";
import styles from './auth.module.css'

export const AuthPage = () => {
    const [form, setForm] = useState({login:'', password: ''});
    const dispatch = useDispatch();
    const {request} = useHttpRequest();
    const loginHandler = async () => {
        dispatch(hideAlert());
        dispatch(login(form));
    };
    const registerHandler = async () => {
        const response = await request('/api/auth/register', 'POST', form,
            {'Content-Type': 'application/json'});
        dispatch(login(form))

    };
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    return(
        <div className={styles.form_login}>
            <div><h2>Авторизация</h2></div>
            <div>
                <label>Логин</label>
                <input  className={styles.form_input} type='text' placeholder='Введите логин' name='login' onChange={changeHandler}/>
                <label>Пароль</label>
                <input className={styles.form_input} type='password' placeholder='Введите пароль' name='password' onChange={changeHandler}/>
                <div>
                    <button className={styles.btn} onClick={loginHandler}>Войти</button>
                </div>
                <div>
                    <button className={styles.btn} onClick={registerHandler}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
};