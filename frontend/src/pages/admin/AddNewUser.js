import React,{useState} from "react";
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {useDispatch} from "react-redux";
import styles from'./addNewUser.module.css'
import {showAlert} from "../../redux/actions";
export const AddNewUser = () => {
    const initialState = {login:'', password: '', FIO: '', telephone: '', accessLevel: 'не выбран'};
    const [form, setForm] = useState(initialState);
    const {request} = useHttpRequest();
    const dispatch = useDispatch();
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const addUser = async () => {
        const data = await request('/api/admin/register', 'POST', form, {'Content-Type': 'application/json'});
        if(data.message){
            return dispatch(showAlert(data.message, 'warning'))
        }
        dispatch(showAlert('Пользователь создан', 'success'));
        setForm(initialState);
    };
    return (
            <div className={styles.form_add}>
                <div className={styles.form_add_item}>
                    <label>Логин</label>
                    <input  className={styles.form_add_input} type='text' placeholder='Введите логин' name='login' onChange={changeHandler}
                            value={form.login}/>
                </div>
                <div className={styles.form_add_item}>
                    <label>Пароль</label>
                    <input className={styles.form_add_input} type='password' placeholder='Введите пароль' name='password' onChange={changeHandler}
                           value={form.password}/>
                </div>
                <div className={styles.form_add_item}>
                    <label>Ф.И.О.</label>
                    <input className={styles.form_add_input} placeholder='Введите ФИО пользователя' name='FIO' onChange={changeHandler}
                           value={form.FIO}/>
                </div>
                <div className={styles.form_add_item}>
                    <label>Телефон</label>
                    <input className={styles.form_add_input} placeholder='Введите телефон пользователя' name='telephone' onChange={changeHandler}
                           value={form.telephone}/>
                </div>

                <div className={styles.form_add_item}>
                    <label>Уровень доступа</label>
                    <select className={styles.select} value={form.accessLevel} name='accessLevel' onChange={changeHandler} >
                        <option value='не выбран'>не выбрано</option>
                        <option value='0'>Администратор</option>
                        <option value='1'>Риэлтор</option>
                        <option value='2'>Менеджер по объектам</option>
                    </select>
                </div>
                <div className={styles.btn_wrapper}>
                    <button className={styles.btn} onClick={addUser}>Добавить</button>
                </div>
            </div>
    )
};