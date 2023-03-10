import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { compose } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
//auth  example
import { authSlice } from './slices/auth';
import { constantDataSlice } from './slices/constant_data';
import { patientSlice } from './slices/patients';
import { addressSlice } from './slices/address';
import { doctorSlice } from './slices/doctors';
import { visitSlice } from './slices/visits';
import { chatSlice } from './slices/chat';
import { paymentSlice } from './slices/payment';
import { ticketSlice } from './slices/support';
import { pharmacySlice } from './slices/pharmacy';
import { laboratorySlice } from './slices/laboratory';


const makeStore = (initialState) => {
  let store;
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const combinedReducers = combineReducers({
      //auth example
      authReducer: authSlice.reducer,
      constantDataReducer: constantDataSlice.reducer,
      patientReducer: patientSlice.reducer,
      addressReducer: addressSlice.reducer,
      doctorReducer :doctorSlice.reducer,
      visitReducer :visitSlice.reducer,
      chatReducer :chatSlice.reducer,
      paymentReducer:paymentSlice.reducer,
      ticketReducer:ticketSlice.reducer,
      pharmacyReducer:pharmacySlice.reducer,
      laboratoryReducer: laboratorySlice.reducer,
    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducers = persistReducer(persistConfig, rootReducer); // Wrapper reducers: if incoming actions are persist actions, run persist commands otherwise use rootReducer to update the state

    store = configureStore({
      reducer: persistedReducers, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk), devTools: { shouldStartLocked: false },
    });

    store.__PERSISTOR = persistStore(store);
  } else {
    const combinedReducers = combineReducers({
      //auth example
      // authReducer: authSlice.reducer,
      
    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };
    store = configureStore({ reducer: rootReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });
  }
  return store;
};
export const wrapper = createWrapper(makeStore, { storeKey: 'key' });


