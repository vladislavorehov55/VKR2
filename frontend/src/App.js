import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./userHooks/useRoutes";
import {useDispatch, useSelector, connect} from "react-redux";
import {login, showNav} from "./redux/actions";
import {Alert} from "./components/Alert";
import {Navbar} from "./components/Navbar";
import './app.css'

function App(props) {
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        if(data && data.token){
            dispatch(login(null, data.token));
            dispatch(showNav())
        }
    },[]);
    const dispatch =  useDispatch();
    const navbar = useSelector(state => state.nav);
    const auth = useSelector(state => state.auth.jwtToken);
    const alert = useSelector(state => state.alert);
    const accessLevel = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).accessLevel :
        null ;
    const routes = useRoutes(Boolean(auth), accessLevel);
    console.log('App');
    return (
        <BrowserRouter>
            {alert.isShowed ? <Alert/> :
            navbar.isShowed && <Navbar/>}
            <div className='main'>
                {routes}
            </div>
        </BrowserRouter>
    );
}
export default App;
