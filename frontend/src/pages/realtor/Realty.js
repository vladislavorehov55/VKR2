import React, {useEffect, useState} from "react";
import styles from './realty.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {getImage, getObject, getObjects} from "../../redux/actions";
import {MyMap} from "../../components/MyMap";

export const Realty = (props) => {
    useEffect(() => {
        async function fetchObjects(){
            const pathname = window.location.pathname === `/object/${props.match.params.id}` ? `/object/${props.match.params.id}`
                : `/myObject/${props.match.params.id}`;
            const data = await request(`/api/user1${pathname}`, 'GET');
            // console.log('data', data); // объект c клюсом object:{} and buf:[]
            dispatch(getObject(data));
            dispatch(getImage(0));
        }
        fetchObjects();
    },[window.location.pathname]);

    const dispatch = useDispatch();
    const {request} = useHttpRequest();
    const object = useSelector(state => state.objects.object);
    const base64 = useSelector(state => state.objects.buf);
    const imageSrc = useSelector(state => state.objects.imageSrc);

    const changeImageHandler = (event) => {
        const ind = base64.indexOf(imageSrc);
        if (event.target.name === 'вперед'){
            if (ind === base64.length-1){
                return dispatch(getImage(0))
            }
            return dispatch(getImage(ind+1))
        }
        if (ind === 0){
            return dispatch(getImage(base64.length-1))
        }
        dispatch(getImage(ind-1))
    };
    const state = useSelector(state => state);
    console.log(state);
    return (
        <div className={styles.wrapper}>
            <h2>
                {`${object.roomsCount}-комн.кв, `}
                {`${object.totalArea}`}м<sup>2</sup>
            </h2>
            <div>
                {`${object.city}, ${object.district}, ${object.area}, ${object.street} ${object.houseNumber}`}
            </div>
            <div className={styles.description}>
                <div className={styles.info}>
                    <div>
                        <h3>{`${object.totalArea}`}м<sup>2</sup></h3>
                        <div>Общая</div>
                    </div>
                    <div>
                        <h3>{`${object.livingSpace}`}м<sup>2</sup></h3>
                        <div>Жилая</div>
                    </div>
                    <div>
                        <h3>{`${object.kitchenSpace}`}м<sup>2</sup></h3>
                        <div>Кухня</div>
                    </div>
                    <div>
                        <h3>{`${object.level} из ${object.totalLevels}`}</h3>
                        <div>Этаж</div>
                    </div>
                </div>
                <div>
                    <h3>Общая информация</h3>
                    <div className={styles.main_info}>
                        <div>
                            <div className={styles.main_info_item}>Тип жилья</div>
                            <div className={styles.main_info_item}>Санузел</div>
                            <div className={styles.main_info_item}>Тип дома</div>
                            <div className={styles.main_info_item}>Лифты</div>
                            <div className={styles.main_info_item}>Парковка</div>
                            <div className={styles.main_info_item}>Вид из окна</div>
                            <div className={styles.main_info_item}>Тип сделки</div>
                            <div className={styles.main_info_item}>Контакты</div>
                        </div>
                        <div>
                            <div className={styles.main_info_item}>{`${object.objectType}`}</div>
                            <div className={styles.main_info_item}>{`${object.toilet}`}</div>
                            <div className={styles.main_info_item}>{`${object.houseType}`}</div>
                            <div className={styles.main_info_item}>{`${object.elevator}`}</div>
                            <div className={styles.main_info_item}>{`${object.parking}`}</div>
                            <div className={styles.main_info_item}>{`${object.view}`}</div>
                            <div className={styles.main_info_item}>{`${object.dealType}`}</div>
                            <div className={styles.main_info_item}>{`${object.telephone}`}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.image_wrapper}>
                <svg className={styles.svg} onClick={changeImageHandler} name='назад'>
                    <line x1='0' y1='25' x2='50' y2='0' stroke='black' strokeWidth='4px'/>
                    <line x1='0' y1='25' x2='50' y2='50' stroke='black' strokeWidth='4px'/>
                </svg>
                <div className={styles.image_wrapper_item}>
                    <img src={imageSrc} className={styles.image}/>
                </div>
                <svg className={styles.svg} onClick={changeImageHandler} name='вперед'>
                    <line x1='0' y1='0' x2='50' y2='25' stroke='black' strokeWidth='4px'/>
                    <line x1="0" y1="50" x2="50" y2="25" stroke='black' strokeWidth='4px'/>
                </svg>
            </div>
        </div>
    )
};