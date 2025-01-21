import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './store/favoritesSlice';
import sessionReducer from './store/sessionSlice';
import storage from 'redux-persist/lib/storage'; // Default to local storage
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    favorites: favoritesReducer,
    session: sessionReducer
})

// Configure persistance
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