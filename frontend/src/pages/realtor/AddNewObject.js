import React, {useEffect, useState} from 'react'
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {showAlert} from "../../redux/actions";
import {useDispatch} from "react-redux";
import styles from './addNewObject.module.css'
export const AddNewObject = () => {
    let formData = new FormData();
    const {request} = useHttpRequest();
    const dispatch = useDispatch();
    const initialState = {cost: '', roomsCount: '', city: '', district:'',
        area: '', street: '', houseNumber: '', apartmentNumber: '', totalArea: '', livingSpace: '', kitchenSpace: '', level: '',
        totalLevels:'',
        balcony: '', toilet: '', elevator:'',  houseType: 'не выбрано', objectType: 'не выбрано',
        dealType: 'не выбрано',
        year: '', view: '', parking:'', telephone: ''};
    const [state, setState] = useState({fieldsValue: initialState, labelValue: 'Выберите файл',
        files: []});
    const array = {placeholder: ['стоимость', 'количество комнат', 'город', 'округ', 'район', 'улицу',
            'номер дома', 'номер квартиры', 'общую площадь', 'жилую площадь','площадь кухни', 'этаж', 'общее количество этажей',
            'информацию о балконе', 'информацию о санузле', 'информацию о лифте', 'тип дома', 'тип жилья',
            'тип сделки', 'год постройки', 'вид из окна', 'информация о парковке','телефон'].map(el => `Укажите ${el}`),
        name: ['cost', 'roomsCount', 'city', 'district', 'area', 'street', 'houseNumber', 'apartmentNumber','totalArea', 'livingSpace',
            'kitchenSpace','level', 'totalLevels', 'balcony', 'toilet', 'elevator', 'houseType', 'objectType',
            'dealType', 'year', 'view', 'parking', 'telephone'],
        value: [state.fieldsValue.cost, state.fieldsValue.roomsCount, state.fieldsValue.city, state.fieldsValue.district,
            state.fieldsValue.area, state.fieldsValue.street, state.fieldsValue.houseNumber, state.fieldsValue.apartmentNumber,
            state.fieldsValue.totalArea, state.fieldsValue.livingSpace, state.fieldsValue.kitchenSpace, state.fieldsValue.level,
            state.fieldsValue.totalLevels, state.fieldsValue.balcony, state.fieldsValue.toilet, state.fieldsValue.elevator,
            state.fieldsValue.houseType,
            state.fieldsValue.objectType, state.fieldsValue.dealType, state.fieldsValue.year, state.fieldsValue.view,
            state.fieldsValue.parking, state.fieldsValue.telephone]};
    const optionValue = {
        houseType: ['не выбрано', 'кирпичный', 'деревянный', 'монолитный', 'панельный', 'блочный', 'кирпично-монолитный',
        'сталинский'],
        objectType: ['не выбрано', 'новостройка', 'вторичка'],
        dealType: ['не выбрано','продажа', 'сдача в аренду'],
        district: ['не выбрано','ЦАО', 'САО', 'СВАО', 'ВАО', 'ЮВАО', 'ЮАО',
            'ЮЗАО', 'ЗАО', 'СЗАО', 'Зеленоградский АО', 'Троицкий АО', 'Новомосковский АО'],
        view: ['не выбрано','во двор','на улицу'],
        parking: ['не выбрано','открытая','закрытая', 'нет']};

    let fileList = null;
    useEffect(() => {
        localStorage.setItem('length', JSON.stringify(0))
    },[]);

    const changeHandler = (e) => {
        setState({...state, fieldsValue: {...state.fieldsValue, [e.target.name]: e.target.value}})
    };
    const addHandler = async (e) => {
        e.preventDefault();
        localStorage.setItem('length', JSON.stringify(0));
        const formFields = Object.entries(state.fieldsValue);
        for (let el of formFields){
            formData.append(el[0].toString(), el[1].toString())
        }
        for (let el of state.files) {
            formData.append('files[]', el)
        }
        const data = await request('/api/user1/create', 'POST', formData);
        console.log('data', data);
        if (data.message){
            window.scrollTo(0,0);
            return dispatch(showAlert(data.message, 'warning'))
        }
        dispatch(showAlert('Объект создан', 'success'));
        setState({fieldsValue: initialState, labelValue: 'Выберите файл', files: []});
        window.scrollTo(0,0);
    };
    const changeFileHandler = (e) => {
        fileList = Array.from(e.target.files);
        if (state.files.length !== 0){
            let a = [];
            for (let el of state.files){
                a.push(el.name)
            }
            for (let el of fileList){
                if (a.includes(el.name)){
                    window.scrollTo(0,0);
                    return dispatch(showAlert('Вы уже добавили такое изображение', 'warning'))
                }
            }
        }
        let len = JSON.parse(localStorage.getItem('length'));
        localStorage.setItem('length', JSON.stringify(len + fileList.length));
        setState({...state, labelValue: `Выбрано: ${JSON.parse(localStorage.getItem('length'))} файла`,
            files: state.files.concat(fileList)});
    };
    const resetHandler = (e) => {
        e.preventDefault();
        setState({...state, labelValue: 'Выберите файл', files: []})
    };
    const changeWord = (word, ind) => {

        if (word.split(' ').length === 2){
            let wordLast = word.split(' ')[1];
            wordLast = wordLast[0].toUpperCase() + wordLast.substring(1, wordLast.length);
            return wordLast
        }
        if (word.split(' ').length === 3){
            let words;
            if (ind === 1 || ind === 6 || ind === 7 ||ind === 11){
                words = word.split(' ');
                words = words[1][0].toUpperCase() + words[1].substring(1, words[1].length) + ' ' + words[2];
                return words
            }
        }

        if (ind === 8 || ind === 9){
            let words = word.split(' ');
            words = words[1][0].toUpperCase() + words[1].substring(1, words[1].length-2) + 'ая' + ' ' + words[2];
            return words
        }
        if (ind === 10){
            return 'Кухня'
        }
        if (ind === 12){
            return 'Общее количество этажей'
        }
        if (ind === 13){
            return 'Балкон'
        }
        if (ind === 14){
            return 'Санузел'
        }
        if (ind === 15){
            return 'Лифт'
         }
        if (ind === 19){
            return 'Год постройки'
        }
    };
    const arrayy = {3:['Округ', 'district'], 16:['Тип дома', 'houseType'],
        17:['Тип объекта', 'objectType'], 18:['Тип сделки','dealType'], 20:['Вид из окна','view'],
        21:['Парковка','parking']};
    return(
        <>
            <form className={styles.wrapper} onSubmit={addHandler} encType='multipart/form-data'>
                {array.placeholder.map( (el, ind) => {
                    if (ind === 3 || ind === 16 || ind === 17 || ind === 18 || ind === 20 || ind === 21){
                        return (
                            <div className={styles.fields_wrapper}>
                                <label className={styles.label_fields}>{arrayy[ind][0]}</label>
                                <select className={styles.select} name={arrayy[ind][1]}
                                        value={state.fieldsValue[arrayy[ind][1]]}
                                        onChange={changeHandler}>
                                {optionValue[arrayy[ind][1]].map(val => <option value={val} key={val}>{val}</option>)}
                            </select></div>
                        )
                    }

                    return <div className={styles.fields_wrapper}>
                        <label className={styles.label_fields}>{changeWord(el, ind)}</label>
                        <input className={styles.input_item}
                               placeholder={el}
                               name={array.name[ind]}
                               value={array.value[ind]}
                               onChange={changeHandler}/>
                    </div>
                } )}
                <div className={styles.label_wrapper}>
                    <label htmlFor='myFiles' className={styles.label}>
                        <span>{state.labelValue}</span>
                    </label>
                    <button onClick={resetHandler} className={styles.btn}>Сбросить выбор</button>
                </div>
                <input type='file' id='myFiles' name='files[]' multiple='multiple' onChange={changeFileHandler} hidden/>
                <div className={styles.btn_wrapper}>
                    <button className={styles.btn}>Добавить</button>
                </div>
            </form>
        </>
    )
};