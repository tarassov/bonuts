import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import "typeface-roboto";
import { checkAuth } from "./actions/authActions";

import { PersistGate } from "redux-persist/integration/react";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Route, Routes } from "react-router-dom";
import { store, history, persistor } from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import indexRoutes from "routes/index.jsx";
import { BrowserRouter } from "react-router-dom";
import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import "assets/css/baseStyle.css";

import { SnackbarProvider } from "notistack";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";


store.dispatch(checkAuth());

const rootElement = document.querySelector("#root");

//index
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <I18nextProvider i18n={i18n}>
      <Router history={history}>
        <PersistGate loading={null} persistor={persistor}>     
          <Routes>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    element={prop.component}
                    key={key}
                  />
                );
              })} 
            </Routes>            
        </PersistGate>
        </Router> 
      </I18nextProvider>
    </SnackbarProvider>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
