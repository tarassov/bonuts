import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import 'typeface-roboto'
import {checkAuth} from './actions/authActions'

import { PersistGate } from 'redux-persist/integration/react'
import {ConnectedRouter} from 'connected-react-router'
import {  Route, Switch } from "react-router-dom";
import {store, history,persistor} from "./store/configureStore"
import * as serviceWorker from './serviceWorker';
import indexRoutes from "routes/index.jsx";
import  "assets/css/baseStyle.css?v=1.0.1";

import { SnackbarProvider } from 'notistack';

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

store.dispatch(checkAuth())

const rootElement = document.querySelector('#root');


ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider>
         <I18nextProvider i18n={i18n}>
            <PersistGate loading={null} persistor={persistor}>
              
              <ConnectedRouter  history={history}>
                <Switch>
                   {indexRoutes.map((prop, key) => {
                     return <Route path={prop.path} component={prop.component} key={key} />;
                   })}
                  </Switch>
              </ConnectedRouter>
            
            </PersistGate>
         </I18nextProvider>
        </SnackbarProvider>
    </Provider>,
    rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
