import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart'
import modalReducer from './modal'
import uiReducer from './ui'
import commonReducer from "./commonStates";
import accountReducer from "./account";
const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    commonState: commonReducer,
    account: accountReducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;