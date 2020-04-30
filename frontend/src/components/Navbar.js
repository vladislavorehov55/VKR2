import React from "react";
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {hideNav, logout} from "../redux/actions";
import styles from './navbar.module.css'
export const Navbar = () => {
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(hideNav())
    };
    const dispatch = useDispatch();
    const accessLevel = JSON.parse(localStorage.getItem('userData')).accessLevel;
    return(
        <nav className={styles.menu}>
            <ul className={styles.nav}>
                {
                    accessLevel === 'риэлтор' &&
                        <>
                            <li className={styles.nav_item}>
                                <Link to='/'>Недвижимость</Link>
                            </li>
                            <li className={styles.nav_item}>
                                <Link to='/create'>Создать новый объект</Link>
                            </li>
                            <li className={styles.nav_item}>
                                <Link to='/myObjects'>Мои объекты</Link>
                                <ul className={styles.drop_down_list}>
                                    <li><Link to='/sold/myObjects'>Продажа</Link></li>
                                    <li><Link to='/arenda/myObjects'>Сдача в аренду</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to={'/closeDeal'}>Создать договор</Link>
                            </li>
                        </>
                }
                {
                    accessLevel === 'админ' &&
                        <>
                            <li className={styles.nav_item}>
                                <Link to='/'>Создать</Link>
                            </li>
                            <li className={styles.nav_item}>
                                <Link to='/users'>Пользователи</Link>
                            </li>
                        </>
                }
                {/*{*/}
                {/*    accessLevel === 'менеджер по объектам' && */}
                {/*        <>*/}
                {/*            <li className={styles.nav_item}>*/}
                {/*                <Link to='/'>П заявку</Link>*/}
                {/*            </li>*/}
                {/*        </>*/}
                {/*}*/}
                {/*{*/}
                {/*    accessLevel === 'клиент' &&*/}
                {/*        <>*/}
                {/*            <li className={styles.nav_item}>*/}
                {/*                <Link to='/'>Подать заявку</Link>*/}
                {/*            </li>*/}
                {/*        </>*/}
                {/*}*/}
                <li className={styles.nav_item}>
                    <a href='/' onClick={logoutHandler}>Выйти</a>
                </li>
            </ul>
        </nav>
    )
};