import React, {useEffect, useState} from "react";
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {useDispatch, useSelector} from "react-redux";
import {getDeal, getObject, getObjects, getUsers, showAlert, showFiltr} from "../../redux/actions";
import {Link} from "react-router-dom";
import styles from "./objects.module.css";
import {Filtr} from "../../components/Filtr";

export const  Objects = () => {
    useEffect(() => {
        async function fetchObjects(){
            const {token} = JSON.parse(localStorage.getItem('userData'));
            const response = await request(`/api/user1${window.location.pathname}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            dispatch(getObjects(response.objects));
        }
        fetchObjects();
    },[window.location.pathname]);
    const chooseObject = async (object) => {
        const {token} = JSON.parse(localStorage.getItem('userData'));
        const response = await request('/api/user1/choose', 'POST', object,
            {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'});
        if (response.message){
            return dispatch(showAlert(response.message, 'warning'))
        }
        dispatch(getObjects(response.objects));
        dispatch(showAlert('Вы выбрали объект', 'success'))
    };
    // const closeDeal = async (object) => {
    //     const {token} = JSON.parse(localStorage.getItem('userData'));
    //     const response = await request('/api/user1/close', 'DELETE', object,
    //         {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'});
    //     if (response.message){
    //         return dispatch(showAlert(response.message, 'warning'))
    //     }
    //     dispatch(getObjects(response.objects));
    //     dispatch(showAlert('Вы закрыли сделку', 'success'))
    // };
    const [btnHidden, setBtnHidden ] = useState(true);
    const showeStatusFields = () => {
        setBtnHidden(!btnHidden)
    };
    const changeStatus = async (id, e) => {
        alert(e.target.textContent);
        const response = await request('/api/user1/change', 'POST',
            {status: e.target.textContent, id: id},
            {'Content-Type': 'application/json'});
        setBtnHidden(true);
        dispatch(getObjects(response.objects))
    };
    const fun =  (id) => {
        localStorage.setItem('id', JSON.stringify(id));
        // const {token} = JSON.parse(localStorage.getItem('userData'));
        // const response = await request(`/api/user1/create/closeDeal/${id}`, 'GET', null,
        //     {Authorization: `Bearer ${token}`});
        // dispatch(getDeal(response.object))
    };
    const showFiltr = () => {
        setShowed(true);
    };
    const hideFiltr = () => {
        setShowed(false)
    };
    const [showed, setShowed] = useState(false);
    const {request} = useHttpRequest();
    const dispatch = useDispatch();
    const pathname = window.location.pathname === '/' ? '/object/' : '/myObject/';
    const {objects} = useSelector(state => state.objects);
    const state = useSelector(state => state);
    console.log(state);
    return (
        <>
            {showed ? <Filtr/> : ''}
            <button className={styles.btn_filter} onClick={showFiltr} hidden={showed} >Открыть фильтр</button>
            <button className={styles.btn_filter} onClick={hideFiltr} hidden={!showed}>Скрыть фильтр</button>
            {objects.map(object =>
                <div key={object._id} className={styles.wrapper}>
                    <Link to={`${pathname}${object._id}`}>
                        <div className={styles.wrapper_item}>
                            <h2>
                                {`${object.roomsCount}-комн.кв, `}
                                {`${object.totalArea}`}м<sup>2</sup>
                                {`, ${object.level}/${object.totalLevels} этаж`}
                            </h2>
                            <div>
                                {`${object.city}, ${object.district}, ${object.area}, улица ${object.street},
                                дом ${object.houseNumber}, кв.${object.apartmentNumber}`}
                            </div>
                            <div>{`${object.cost} или`}</div>
                            <div>{`${Math.floor(object.cost / object.totalArea)} р/`}
                                м<sup>2</sup>
                            </div>
                        </div>
                    </Link>
                    {
                        window.location.pathname === '/' ?
                            object.owner.length === 0 ?
                        <div>
                            <button className={styles.btn} onClick={chooseObject.bind(this, object)}>Закрепить</button>
                        </div>
                                : <div>Ведет {object.owner[0]},{object.owner[2]}</div>
                            :
                            <div>
                                <div className={styles.status_wrapper}>
                                    <h3>Статус</h3>
                                    <div>{object.dealStatus}</div>
                                </div>
                                <button className={styles.btn} onClick={showeStatusFields}>Изменить статус</button>
                                <div hidden={btnHidden}>
                                    <div className={styles.status_field} onClick={changeStatus.bind(this, object._id)}>
                                        Договор подписан</div>
                                    <div className={styles.status_field} onClick={changeStatus.bind(this, object._id)}>Показ объекта</div>
                                    <div className={styles.status_field} onClick={changeStatus.bind(this, object._id)}>Внесение зададка</div>
                                    <div className={styles.status_field} onClick={changeStatus.bind(this, object._id)}>Оформление бумаг</div>
                                    <div className={styles.status_field} onClick={fun.bind(this, object._id)}>
                                        Закрыть сделку
                                        {/*<Link to={`/closeDeal/${object._id}`}> Закрыть сделку</Link>*/}
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            )}
        </>
    )
};