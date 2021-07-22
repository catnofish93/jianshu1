import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import detailReducer from "./detailReducer";
import user from "./user";
import article from "./article";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    reducer,
    detailReducer,
    user,
    article
})

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
    let store = createStore(persistedReducer, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
    let persistor = persistStore(store)
    return { store, persistor }
};
