import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from "containers/AppContainer"
import { Provider } from 'react-redux'
import 'typeface-roboto'
import {checkAuth} from './actions/authActions'

import { PersistGate } from 'redux-persist/integration/react'
import {ConnectedRouter} from 'react-router-redux'
import { Router, Route, Switch } from "react-router-dom";
import {store, history,persistor} from "./store/configureStore"
import App from './App';
import * as serviceWorker from './serviceWorker';
import indexRoutes from "routes/index.jsx";
import  "assets/css/baseStyle.css?v=1.0.1";


store.dispatch(checkAuth())

const rootElement = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
             {indexRoutes.map((prop, key) => {
               return <Route path={prop.path} component={prop.component} key={key} />;
             })}
            </Switch>
        </ConnectedRouter>
        </PersistGate>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
