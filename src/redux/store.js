import { combineReducers, configureStore } from '@reduxjs/toolkit';
import listSlice from './store/listSlice';
import sessionSlice from './store/sessionSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    list: listSlice,
    session: sessionSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);