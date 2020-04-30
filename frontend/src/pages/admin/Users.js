import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttpRequest} from "../../userHooks/useHttpRequet";
import {deleteUser, getUsers} from "../../redux/actions";
import styles from './users.module.css'
import {Filtr} from "../../components/Filtr";
export const Users = () => {
    const deleteHandler = async (id) => {
        const data = await request(`/api/admin/users/${id}`, 'DELETE');
        dispatch(getUsers(data))
    };
    useEffect(() => {
        async function fetchData() {
            const data = await request('/api/admin/users', 'GET');
            return dispatch(getUsers(data));
        }
        fetchData()
    },[]);

    const {request} = useHttpRequest();
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    return(
        <>
            <Filtr/>
            <table className={styles.users_table}>
                <thead>
                <tr>
                    <th className={styles.th}>Логин</th>
                    <th className={styles.th}>ФИО</th>
                    <th className={styles.th}>Телефон</th>
                    <th className={styles.th}>Уровень доступа</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.users.map( user => <tr key={user._id}>
                        <td className={styles.td}>{user.login}</td>
                        <td className={styles.td}>{user.FIO}</td>
                        <td className={styles.td}>{user.telephone}</td>
                        <td className={styles.td}>{user.accessLevel}</td>
                        <td className={styles.td}
                            onClick={deleteHandler.bind(this, user._id)}
                        >Удалить</td></tr>
                    )
                }
                </tbody>
            </table>
        </>
    )
};