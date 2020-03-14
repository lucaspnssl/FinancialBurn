import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/login';
import Menu from './pages/menu';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={(props) => <Login {...props} isAuthed={true}/>}/>
                <Route path="/menu" component={Menu}/>
            </Switch>
        </BrowserRouter>
    );
}
