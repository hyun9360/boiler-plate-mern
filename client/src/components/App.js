import React, { Suspense } from 'react';
import {Route, Switch} from 'react-router-dom'

import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage";
import Login from './views/LoginPage/LoginPage'
import Register from './views/RegisterPage/RegisterPage'
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import Index from './views/Chatbot'

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route exact path="/chatBot" component={Auth(Index, false)} />
                    <Route exact path="/login" component={Auth(Login, false)} />
                    <Route exact path="/register" component={Auth(Register, false)} />
                </Switch>
            </div>
            <Footer />
        </Suspense>
    );
}

export default App;
