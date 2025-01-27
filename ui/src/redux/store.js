import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './store/favoritesSlice';
import sessionReducer from './store/sessionSlice';
import storage from 'redux-persist/lib/storage'; // Default to local storage
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { Hub } from 'aws-amplify/utils';
import { setAuthUser } from './store/sessionSlice';

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

function handleSignIn({ data, store }) {
    console.log(data);
    const userId = data.userId;

    if(userId) {
        store.dispatch(setAuthUser(userId));
    }
}

function handleSignOut({ store }) {
    store.dispatch(setAuthUser(null));
}

Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
        case 'signedIn':
            console.log('sign in successful');
            handleSignIn({
                data: payload.data,
                store
            });
            break;
        case 'signedOut':
            console.log('sign out successful');
            handleSignOut({ store });
            break;
        case 'tokenRefresh_failure':
            handleSignOut({ store });
            break;
        case 'signUp':
            console.log('sign up successful');
            handleSignIn({
                data: payload.data,
                store
            });
            break;
        case 'confirmSignUp':
            console.log('user confirmation successful');
            break;
        case 'autoSignIn':
            console.log('auto sign in successful');
            handleSignIn({
                data: payload.data,
                store
            });
            break;
        default:
            console.log(payload.event)
            break;
    }
})

export const persistor = persistStore(store);