import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "../pages/AuthPage";
import {Objects} from "../pages/realtor/Objects";
import {AddNewUser} from "../pages/admin/AddNewUser";
import {AddNewObject} from "../pages/realtor/AddNewObject";
import {Users} from "../pages/admin/Users";
import {Realty} from "../pages/realtor/Realty";
import {Client} from "../pages/client/Client";
import {CloseDeal} from "../pages/realtor/CloseDeal";

export const useRoutes = (isAuthenticated, accessLevel) => {
    if(isAuthenticated){
        switch (accessLevel) {
            case 'админ':
                return (
                    <Switch>
                        <Route exact path='/' component={AddNewUser}/>
                        <Route exact path='/users' component={Users}/>
                    </Switch>
                );
            case 'риэлтор':
                return (
                    <Switch>
                        <Route exact path = '/' component={Objects}/>
                        <Route exact path='/create' component={AddNewObject}/>
                        <Route exact path='/object/:id' component={Realty}/>
                        <Route exact path='/myObject/:id' component={Realty}/>
                        <Route exact path='/myObjects' component={Objects}/>
                        <Route exact path='/sold/myObjects' component={Objects}/>
                        <Route exact path='/arenda/myObjects' component={Objects}/>
                        <Route exact path='/closeDeal' component={CloseDeal}/>
                    </Switch>
                );
            case 'менеджер по объектам':
                return (
                    <Switch>
                        <Route exact path = '/' component={AddNewObject}/>
                    </Switch>
                );
            case 'клиент':
                return (
                    <Switch>
                        <Route exact path = '/' component={AddNewObject}/>
                    </Switch>
                );
            default: break
        }
    }
    return (
        <Switch>
            <Route exact path='/' component={AuthPage}/>
            <Redirect to='/'/>
        </Switch>
    )
};