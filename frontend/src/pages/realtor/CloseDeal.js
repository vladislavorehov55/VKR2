import React, {useDebugValue, useEffect, useState} from "react";
import styles from './closeDeal.module.css'
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {useDispatch, useSelector} from "react-redux";
import {getDeal} from "../../redux/actions";

export const CloseDeal = (props) => {

    const {request} = useHttpRequest();
    const dispatch = useDispatch();
    // const deal = useSelector(state => state.deal);
    useEffect(() => {
        async function fetchedData(){
            const id = JSON.parse(localStorage.getItem('id'));
            const {token} = JSON.parse(localStorage.getItem('userData'));
            const response = await request(`/api/user1/create/deal/${id}`, 'GET', null,
                {Authorization: `Bearer ${token}`});
            console.log('response', response);
            setA(response.object[0])
            // dispatch(getDeal(response.object))
        }
        fetchedData()
    },[]);
    const [deal, setA] = useState({});
    console.log('DEAL', deal);
    return (
        <div className={styles.deal_wrapper}>
            <div>
                <label>Номер договора</label>
                <input placeholder='введите номер договора'/>
            </div>
            <div>
                <label>дата сделки</label>
                <input type='date'/>
            </div>
            <div>
                <label>Объект</label>
                <label>{deal._id}</label>
            </div>
            <div>
                <label>Работник</label>
                <label>{deal.owner === undefined ? '': deal.owner[0]}</label>
            </div>
            <div>
                <label>Сумма сделки</label>
                <label>{deal.cost}</label>
            </div>
        </div>
    )
}