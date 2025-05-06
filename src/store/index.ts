import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import cartReducer from './cart'
import modalReducer from './modal'
import uiReducer from './ui'
import commonReducer from "./commonStates";
import accountReducer from "./account";
import authReducer from "./auth";
import homepageReducer from './homePage';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "commonState"], // persist auth and commonState slices
};

const rootReducer = combineReducers({
  auth: authReducer,
  commonState: commonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducers: persistedReducer,
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    account: accountReducer,
    homepage: homepageReducer,
  },
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
})

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;