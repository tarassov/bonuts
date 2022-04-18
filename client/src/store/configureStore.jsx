import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createReduxHistoryContext, reachify } from "redux-first-history";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { initialState } from "store/initialState";
import { createBrowserHistory } from "history";
import initSubscriber from "redux-subscriber";



const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
  history: createBrowserHistory(),
  //other options if needed 
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["dashboard"],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, rootReducer(routerReducer));


export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk),applyMiddleware(routerMiddleware))
);

initSubscriber(store);

export const persistor = persistStore(store);
// Create a history of your choosing (we're using a browser history in this case)
export const history = createReduxHistory(store);