import React, {useState} from "react";
import styles from './filtr.module.css'
import {useDispatch, useSelector} from "react-redux";
import {activateBtn, getObjects, getUsers, showAlert} from "../redux/actions";
import {useHttpRequest} from "../userHooks/useHttpRequet";
import {ACTIVE_BTN} from "../redux/types";
export const Filtr = () => {
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const filtrHandler = async () => {
        if (Object.values(form).join('').substring(0, 10) === 'не выбрано'){
            return dispatch(showAlert('Вы не ввели ни один из критериев фильтрации!', 'warning'))
        }
        const {token, accessLevel} = JSON.parse(localStorage.getItem('userData'));
        if (accessLevel === 'админ'){
            const response = await request('api/admin/filtration', 'POST', form,
                { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'});
            dispatch(getUsers(response.data));
        }
        else if (accessLevel === 'риэлтор'){
            const response = await request('api/user1/filtration', 'POST', form,
                { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'});
            dispatch(getObjects(response.data))
        }
        setBtn({filtrDisable: true, cancelDisable: false})
    };
    const cancelHandler = async () => {
        const {token, accessLevel} = JSON.parse(localStorage.getItem('userData'));
        if (accessLevel === 'админ'){
            const response = await request('/api/admin/cancelFiltration', 'GET', null,
                {Authorization: `Bearer ${token}`});
            dispatch(getUsers(response.data));
        }
        else if (accessLevel === 'риэлтор'){
            const response = await request('/api/user1/cancelFiltration', 'GET', null,
                {Authorization: `Bearer ${token}`});
            dispatch(getObjects(response.data))
        }
        setBtn({filtrDisable: false, cancelDisable: true});
        setForm(initialState);
    };
    const initialState = {login: '', FIO:'', userTelephone:'', accessLevel: 'не выбрано', costBegin: '', costEnd:'', roomsCountBegin: '', roomsCountEnd: '',
        city: '', district:'',
        area: '', street: '', houseNumber: '', totalAreaBegin: '', totalAreaEnd: '',
        livingSpaceBegin: '', livingSpaceEnd: '', kitchenSpaceBegin: '', kitchenSpaceEnd: '', levelBegin: '',levelEnd: '',
        totalLevelsBegin:'', totalLevelsEnd:'', balcony: '', toilet: '',
        elevator:'', houseType: 'не выбрано', objectType: 'не выбрано', dealType: 'не выбрано',
        view: 'не выбрано', parking: 'не выбрано', yearBegin: '', yearEnd: ''};
    const [form, setForm] = useState(initialState);

    const [btn, setBtn] = useState({filtrDisable: false, cancelDisable: true});
    const dispatch = useDispatch();
    const {request} = useHttpRequest();
    if (JSON.parse(localStorage.getItem('userData')).accessLevel === 'админ'){
        return (
            <div className={styles.wrapper}>
                <div className={styles.fields}>
                    <label className={styles.label}>Логин</label>
                    <input className={styles.input} name='login' placeholder='Введите логин' onChange={changeHandler}
                           value={form.login}/>
                </div>
                <div className={styles.fields}>
                    <label className={styles.label}>Ф.И.О.</label>
                    <input className={styles.input} name='FIO' placeholder='Введите Ф.И.О.' onChange={changeHandler}
                           value={form.FIO}/>
                </div>
                <div className={styles.fields}>
                    <label className={styles.label}>Телефон</label>
                    <input className={styles.input} name='userTelephone' placeholder='Введите телефон' onChange={changeHandler}
                           value={form.userTelephone}/>
                </div>
                <div className={styles.fields}>
                    <label className={styles.label}>Уровень доступа</label>
                     <select className={styles.input} name='accessLevel' value={form.accessLevel} onChange={changeHandler}>
                         <option value='не выбрано'>не выбрано</option>
                         <option value='админ'>админ</option>
                         <option value='риэлтор'>риэлтор</option>
                         <option value='менеджер по объектам'>менеджер по объектам</option>
                     </select>
                </div>
                <button className={styles.btn}  disabled={btn.filtrDisable} onClick={filtrHandler}>Отфильтровать</button>
                <button className={styles.btn} disabled={btn.cancelDisable} onClick={cancelHandler}>Отменить</button>
            </div>
        )
    }
    return (
        <div className={styles.wrapper_realtor}>
            {
                window.location.pathname === '/' &&
                <div className={styles.fields_realtor}>
                    <label className={styles.label}>Тип сделки</label>
                    <select className={styles.input_realtor} name='dealType' value={form.dealType} onChange={changeHandler}>
                        <option value='не выбрано'>не выбрано</option>
                        <option value='продажа'>продажа</option>
                        <option value='сдача в аренду'>сдача в аренду</option>
                    </select>
                </div>
            }
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Стоимость</label>
                <input className={styles.input_realtor} placeholder='от' value={form.costBegin}
                       name='costBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor}  placeholder='до' value={form.costEnd}
                       name='costEnd' onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Количество комнат</label>
                <input className={styles.input_realtor} placeholder='от' value={form.roomsCountBegin}
                       name='roomsCountBegin'
                       onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.roomsCountEnd}
                       name='roomsCountEnd'
                       onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Город</label>
                <input className={styles.input_realtor} placeholder='Введите город' value={form.city}
                       name='city'
                       onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Округ</label>
                <input className={styles.input_realtor} placeholder='Введите округ' value={form.district}
                       name='district'
                       onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Район</label>
                <input className={styles.input_realtor} placeholder='Введите район' value={form.area}
                       name='area'
                       onChange={changeHandler}/>
            </div>

            <div className={styles.fields_realtor}>
                <label className={styles.label}>Улица</label>
                <input className={styles.input_realtor} placeholder='Введите улицу' value={form.street}
                       name='street'
                       onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Общая площадь</label>
                <input className={styles.input_realtor} placeholder='от' value={form.totalAreaBegin}
                       name='totalAreaBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.totalAreaEnd}
                       name='totalAreaEnd' onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Жилая площадь</label>
                <input className={styles.input_realtor} placeholder='от' value={form.livingSpaceBegin}
                       name='livingSpaceBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.livingSpaceEnd}
                       name='livingSpaceEnd' onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Площадь кухни</label>
                <input className={styles.input_realtor} placeholder='от' value={form.kitchenSpaceBegin}
                       name='kitchenSpaceBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.kitchenSpaceEnd}
                       name='kitchenSpaceEnd' onChange={changeHandler}/>
            </div>

            <div className={styles.fields_realtor}>
                <label className={styles.label}>Этаж</label>
                <input className={styles.input_realtor} placeholder='от' value={form.levelBegin}
                       name='levelBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.levelEnd}
                       name='levelEnd' onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Общее количество этажей</label>
                <input className={styles.input_realtor} placeholder='от' value={form.totalLevelsBegin}
                       name='totalLevelsBegin' onChange={changeHandler}/>
                <input className={styles.input_realtor} placeholder='до' value={form.totalLevelsEnd}
                       name='totalLevelsEnd' onChange={changeHandler}/>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Тип дома</label>
                <select className={styles.input_realtor} name='houseType' value={form.houseType} onChange={changeHandler}>
                    <option value='не выбрано'>не выбрано</option>
                    <option value='кирпичный'>кирпичный</option>
                    <option value='деревянный'>деревянный</option>
                    <option value='монолитный'>монолитный</option>
                    <option value='панельный'>панельный</option>
                    <option value='блочный'>блочный</option>
                    <option value='кирпично-монолитный'>кирпично-монолитный</option>
                    <option value='сталинский'>сталинский</option>
                </select>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Тип объекта</label>
                <select className={styles.input_realtor} name='objectType' value={form.objectType} onChange={changeHandler}>
                    <option value='не выбрано'>не выбрано</option>
                    <option value='новостройка'>новостройка</option>
                    <option value='вторичка'>вторичка</option>
                </select>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Вид из окна</label>
                <select className={styles.input_realtor} name='view' value={form.view} onChange={changeHandler}>
                    <option value='не выбрано'>не выбрано</option>
                    <option value='на двор'>на двор</option>
                    <option value='на улицу'>на улицу</option>
                </select>
            </div>
            <div className={styles.fields_realtor}>
                <label className={styles.label}>Парковка</label>
                <select className={styles.input_realtor} name='parking' value={form.parking} onChange={changeHandler}>
                    <option value='не выбрано'>не выбрано</option>
                    <option value='октрытая'>октрытая</option>
                    <option value='закрытая'>закрытая</option>
                    <option value='нет'>нет</option>
                </select>
            </div>
            <div>
                <label className={styles.label}>Год постройки</label>
                <input className={styles.input_realtor} placeholder='от'
                       name='yearBegin' value={form.yearBegin}
                       onChange={changeHandler}
                />
                <input className={styles.input_realtor} placeholder='до' name='yearEnd' value={form.yearEnd}
                       onChange={changeHandler}
                />
            </div>
            <button className={styles.btn}  disabled={btn.filtrDisable} onClick={filtrHandler}>Отфильтровать</button>
            <button className={styles.btn} disabled={btn.cancelDisable} onClick={cancelHandler}>Отменить</button>
        </div>
   )

};