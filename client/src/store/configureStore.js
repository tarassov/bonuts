import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import  {initialState} from "store/initalState"
import createHistory from 'history/createBrowserHistory'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['dashboard'],
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const router = routerMiddleware(history)


export  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(router)
    )
)

export const persistor = persistStore(store)

